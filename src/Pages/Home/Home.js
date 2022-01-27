import React from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import Banner from './Banner/Banner'
import Blogs from "./Blogs/Blogs";

const Home = () => {
  return (
    <div>
         <Header></Header>
         <Banner></Banner>
         <Blogs></Blogs>
         <Footer></Footer>
    </div>
  );
};

export default Home;
