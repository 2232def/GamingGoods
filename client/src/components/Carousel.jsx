import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./styles.css";
import "./ImageGrid.jsx";

// import required modules
import { Scrollbar, Autoplay } from "swiper/modules";
import ImageGrid from "./ImageGrid.jsx";

const appStyle = {
  fontFamily: "'Verdana', Sans-serif"
};

function Carousel() {
  return (
    <div style={appStyle} className="w-full h-screen relative">
      <div className="bg-white text-center pt-10 ">
        <h1 className="text-6xl pb-1 ">Shop by category</h1>
      </div>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ImageGrid />
        </SwiperSlide>
        <SwiperSlide>
          <ImageGrid />
        </SwiperSlide>
        <SwiperSlide>
          <ImageGrid />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
