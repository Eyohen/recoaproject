// import React from 'react'
import Navbar from "../components/Navbar";
import BrowseSub from "../components/BrowseSub";
import Hero from "../components/Hero";
import Featured from "../components/Featured";

const FrontPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BrowseSub />
      <Featured />
    </div>
  );
};

export default FrontPage;
