import React from "react";

const appStyle = {
  fontFamily: "'Verdana', Sans-serif"
};

function Section1() {
  return (
    <div style={appStyle} className=" w-full  bg-red-400 overflow-hidden">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className=" p-20 relative">
          <img
            alt=""
            src="./src/assets/valo_raze.png"
            className="size-[35rem] w-[52rem] bg-red-400 rounded-lg bg-gray-100"
          />
          <img
            alt=""
            src="./src/assets/Valo_Sage.png"
            className="size-[35rem] absolute top-20 left-60 mix-blend-darken rounded-lg bg-gray-100"
          />
        </div>
        <div className="" dir="ltr">
          <h2 className="text-3xl ps-[20vw] text-wrap font-bold text-gray-900 sm:text-4xl">
            Merchandise
          </h2>
          <p className="mt-4 ps-[20vw] text-gray-500 text-wrap">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
            delectus, vitae, minima quisquam exercitationem nesciunt non cum
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section1;
