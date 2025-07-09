import React from "react";
import { FaHeart } from "react-icons/fa";

function Wishlist() {
  return (
    <div className="wishlist-container w-[100vw] h-[100vh] bg-red-100">
      <h1>Wishlist</h1>
      <p>Your favorite items will appear here.</p>

      <div className="p-8 w-full z-[0]">
        <div className="">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Your Wishlist
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div className="group relative rounded-md bg-gray-100 border-8 border-gray-100 p-3">
                  <div className="aspect-square">
                    <img
                      alt=""
                      className=" rounded-md mix-blend-darken group-hover:opacity-75 object-fill"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a>
                          <span aria-hidden="true" className="absolute" />
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900"></p>
                  </div>
                  <div>
                    <FaHeart />
                  </div>

                  <div className="flex justify-between items-center">
                    <a className="btn flex items-center mt-4 bg-white border-gray-400 text-xl bg-red hover:bg-red-500">
                      Go to store
                    </a>
                    <a className="btn flex items-center mt-4 bg-white border-gray-400 text-xl bg-red hover:bg-red-500">
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
