import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Blog from './Blog';
import './Blogs.css';
// react spinner 
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";
// react spinner 

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 10;

  useEffect(() => {
    fetch(`https://sleepy-mesa-04382.herokuapp.com/blogs?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        console.log(data.blogs)
        const count = data.count;
        const pageNumber = Math.round(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);
  // calling api to get advocate details  
  // react spinner 
  let [spinner, setSpinner] = useState(true);
  let [color, setColor] = useState("#36D7B7");
  const override = css`
  display: block;
  margin: 125px auto;
  border-color: red;
`;
  // react spinner 


  if (blogs.length === 0) {
    return <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {" "}
      <HashLoader color={color} spinner={spinner} css={override} size={65} />
    </div>
  }
  return (
    <>
      <div className=" d-flex justify-content-end">
      </div>

      <Row className="mx-auto">
        {blogs?.map((blog) => (
          <Blog key={blog._id}
            blog={blog}>

          </Blog>


        ))}
        <div className="pagination">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              className={number === page ? "selected" : ""}
              key={number}
              onClick={() => setPage(number)}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </Row>
    </>
  );
};

export default Blogs;