import { React, useState } from "react";
import Navbar from "./components/Navbar";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Carousel from "./components/Carousel";
import Blog from "./components/Blog";
import Section3 from "./components/Section3";
import Footer from "./components/footer";

function Home() {
  return (
    <div className="bg-white">
      <Section1 />
      <Section2 />
      <Carousel />
      <Blog />
      <Section3 />
      <Footer/>
    </div>
  );
}

export default Home;