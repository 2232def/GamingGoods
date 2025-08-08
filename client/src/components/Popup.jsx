import React, { useState } from "react";
import Cart from "./Cart";
import Signup_as_user from "./Signup_as_user";
import { useLocation } from "react-router-dom";
import Reviews from "./Reviews";
function Popup({
  visible,
  onClose,
  handleClick,
  item,
  size,
  handleChange,
  warning,
  cart,
  setCart,
}) {
  if (!visible) return null;

  const [showPopup, setShowPopup] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();
  const previousPath = location.pathname;

  const handleSignup = () => {
    setShowSignup(true);
    setShowPopup(true);
    window.history.pushState({}, "", "/signup/register");
  };

  const handleOnClosePopup = () => {
    setShowPopup(false);
    setShowSignup(false);
    window.history.pushState({}, "", previousPath);
  };

  const [showCart, setShowCart] = useState(false);
  const handleOnClose = () => {
    setShowCart(false);
  };

  return (
    <section className="w-full h-screen fixed top-0 left-0 backdrop-blur-sm z-[99999] bg-black bg-opacity-50 flex items-center justify-center">
      <div>
        {warning && (
          <div className="flex justify-center items-center absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <span className="text-sm md:text-xl text-white bg-red-600 p-3 md:p-4 w-[80vw] md:w-[33vw] text-center rounded-md shadow-lg">
              This item is already added to the cart
            </span>
          </div>
        )}
      </div>
      <div className="w-[95vw] bg-red-400 md:w-[90vw] h-[95vh] md:h-[90vh]  rounded-lg shadow-2xl overflow-hidden relative">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="absolute top-4 right-16 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setShowCart(true)}
          >
            <img
              className="w-6 h-6"
              src="./src/assets/empty-cart.png"
              alt="Cart"
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {size}
            </span>
          </div>
        </div>
        <div className="h-full bg-red-300 overflow-x-hidden">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-4 md:p-6 lg:p-8 pt-16">
            {/* Image Section */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1">
              {/* Thumbnail Images */}
              <div className="flex lg:flex-col gap-2 lg:gap-4 order-2 lg:order-1">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={item.imageSrc}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 max-w-md lg:max-w-lg order-1 lg:order-2">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={item.imageSrc}
                    alt={item.title}
                  />
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex-1 max-w-md lg:max-w-lg space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Product Review
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {item?.title || "No Title Available"}
                </h1>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                eligendi voluptatibus at repellendus voluptates, non aliquam
                blanditiis nulla! Ea, laboriosam. Discover premium gaming gear
                designed for performance and style.
              </p>

              {/* Price Section */}
              <div className="space-y-2">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Price
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{parseInt(item.price) + 500}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Save ₹500
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => handleClick(item)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={handleSignup}
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Product Info */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Free shipping on orders over ₹999
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  30-day return policy
                </div>
              </div>
            </div>
          </div>
          <div className="Product-details m-20 p-20 bg-white w-[85vw] rounded-lg md:w-[80vw] ">
            <span className="text-3xl font-bold text-gray-900">
              Product Description
            </span>
            <section className="w-full h-[0.1px] bg-gray-300" />
            <div className="pics-text"></div>
          </div>
          <div className="specifications m-20 p-20 bg-white w-[75vw] rounded-lg md:w-[70vw] ">
            <span className="text-3xl font-bold text-gray-900">
              Specifications
            </span>
            <section className="w-full h-[0.1px] bg-gray-300" />
          </div>

          <div className="similar-products m-20 p-20 bg-white w-[75vw] rounded-lg md:w-[70vw] ">
            <span className="text-3xl font-bold text-gray-900">
              Similar Products
            </span>
            <section className="w-full h-[0.1px] bg-gray-300" />
          </div>
          <div className="reviews m-20 p-20 bg-white w-[75vw] rounded-lg md:w-[70vw] ">
            <Reviews />
          </div>
        </div>
      </div>
      <Cart
        visible={showCart}
        cart={cart}
        setCart={setCart}
        handleChange={handleChange}
        onClose={handleOnClose}
      />
      {showPopup && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
            <Signup_as_user onClose={handleOnClosePopup} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Popup;
