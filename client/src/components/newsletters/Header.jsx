import React from "react";

function Header() {
  return (
    <div className="w-full h-[50%] bg-red-500 pb-4">
      <div className="flex items-center justify-around py-4">
        <div className="logo">
          <img src="" alt="" />
          <span className="">NEWSLETTER</span>
        </div>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 text-white bg-black rounded-lg focus:outline-none focus:ring-3 focus:ring-red-300"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="black"
              viewBox="0 0 24 24"
              stroke="red"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="notification">
          <img src="" alt="" />
        </div>
      </div>
      <div className="m-9 text-center space-y-8">
        <h1 className="text-5xl font-normal">
          🎮 Level Up Your Gaming News!
        </h1>
        <p className="text-lg font-light w-1/2 mx-auto">
          Stay ahead in the gaming world with the latest updates, reviews, and
          insider scoops. From blockbuster releases to hidden gems, we’ve got
          everything you need to power up your gaming experience! 🚀🔥
        </p>
      </div>
    </div>
  );
}

export default Header;
