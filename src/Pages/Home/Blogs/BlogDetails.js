import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import { Container, Row, Col, Card } from "react-bootstrap"
const BlogDetails = () => {

  const { id } = useParams();
  const [advocate, setAdvocate] = useState({})
  useEffect(() => {
    const url = `https://sleepy-mesa-04382.herokuapp.com/blogs/${id}`;
    axios.get(url).then((res) => {
      setAdvocate(res.data);
      console.log(res.data, 'found')
    });
  }, [id]);
  const { image, name, price, category, facility } = advocate;


  return (
    <Container>
      <Row>
        <Col sm={12} md={7}>
          <Card.Img variant="top" src={image} className="img-fluid" alt="advocate-image" />

        </Col>
        <Col sm={12} md={5}>

          <div>
            <h3>Name: {name}</h3>
            <h5>Specialized in: {category}</h5>
            <h5>Price: {price}</h5>
            <p className="text-justify">{facility}</p>
          </div>
        </Col>
      </Row>


    </Container>
  );
};

export default BlogDetails;