import React from "react";

const appStyle = {
  fontFamily: "'Verdana', Sans-serif"
};

function Section2() {
  return (
    <>
      <div style={appStyle} className="w-full h-screen flex overflow-hidden bg-red-100">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Gaming accessories
            </h2>
            <p className="mt-4 text-gray-500">
              The walnut wood card tray is precision milled to perfectly fit a
              stack of Focus cards. The powder coated steel divider separates
              active cards from new ones, or can be used to archive important
              task lists.
            </p>
          </div>
          <div className="grid ">
            <img
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              src="./src/assets/con1.jpg"
              className="rounded-lg mix-blend-darken bg-gray-100"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Section2;
