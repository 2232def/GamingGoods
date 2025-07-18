import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

gsap.registerPlugin(useGSAP);

const appStyle = {
  fontFamily: "'Verdana', Sans-serif",
};

const NavLink = ({ to, className, children }) => (
  <Link
    to={to}
    className={`${className} `}
  >
    {children}
  </Link>
);

function Navbar() {
  // const handleClickAbout = () => {
  //   gsap.to(".about", {
  //     scaleX: 100,
  //     duration: 10,
  //     z: -1,
  //     backgroundColor: "red",
  //   });
  // };

  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      style={appStyle}
      className="navbar bg-white shadow-md fixed top-0 left-0 right-0 z-[1000] w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Left Section - About & Blog */}
          <div className="hidden lg:flex items-center gap-50">
            <div className="about bg-red-200 text-red-500 px-5 py-2.5 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors">
              <NavLink to="/about" className="font-medium">
                <span>About</span>
              </NavLink>
            </div>
            <div className="blog bg-red-200 text-red-500 px-5 py-2.5 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors">
              <NavLink to="/Newsletters" className="font-medium">Blog</NavLink>
            </div>
          </div>

          {/* Center Logo - Always visible */}
          <div className="flex-shrink-0 bg-red-100 rounded-full p-2 lg:p-4">
            <NavLink to="/" className="block">
              <img
                src="./src/assets/Logo.png"
                className="w-16 h-auto sm:w-20 lg:w-24 xl:w-32 mix-blend-darken"
                alt="Gaming Goods Logo"
              />
            </NavLink>
          </div>

          {/* Desktop Right Section - Products & Account */}
          <div className="hidden lg:flex items-center gap-50">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <NavLink to="/Products">
                <button className="bg-red-200 text-red-500 px-5 py-2.5 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors font-medium">
                  Products
                </button>
              </NavLink>
              {isProductDropdownOpen && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-md mt-2 z-20 py-2 w-48 border">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <span className="text-gray-700">All Products</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <span className="text-gray-700">Gaming PCs</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <span className="text-gray-700">Accessories</span>
                  </div>
                </div>
              )}
            </div>

            {/* Account Dropdown */}
            <div
              className="relative"
              onMouseEnter={toggleAccountDropdown}
              onMouseLeave={toggleAccountDropdown}
            >
              <button className="bg-red-200 text-red-500 px-5 py-2.5 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors font-medium">
                My Account
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute right-0 top-full bg-white shadow-lg rounded-md mt-2 z-20 py-2 w-48 border">
                  <NavLink to="/wishlist" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">❤️ Wishlist</span>
                  </NavLink>
                  <NavLink to="/Signup/user" className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors">
                    <img src="./src/assets/avatar.png" alt="User" className="w-5 h-5 mr-2" />
                    <span className="text-gray-700">User</span>
                  </NavLink>
                  <NavLink to="/Signup" className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors">
                    <img src="./src/assets/avatar.png" alt="Admin" className="w-5 h-5 mr-2" />
                    <span className="text-gray-700">Admin</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-4">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-md text-red-500 hover:text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Links */}
              <div className="block px-3 py-2">
                <NavLink 
                  to="/about" 
                  className="block bg-red-200 text-red-500 px-4 py-2 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  About
                </NavLink>
              </div>
              
              <div className="block px-3 py-2">
                <NavLink 
                  to="/Newsletters" 
                  className="block bg-red-200 text-red-500 px-4 py-2 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  Blog
                </NavLink>
              </div>

              <div className="block px-3 py-2">
                <NavLink 
                  to="/Products" 
                  className="block bg-red-200 text-red-500 px-4 py-2 rounded-md hover:bg-red-300 hover:text-red-700 transition-colors font-medium"
                  onClick={toggleMobileMenu}
                >
                  Products
                </NavLink>
              </div>

              {/* Mobile Account Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="px-3 py-2">
                  <p className="text-gray-500 font-medium text-sm mb-2">Account</p>
                  
                  <NavLink 
                    to="/wishlist" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <span className="mr-2">❤️</span>
                    <span>Wishlist</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/Signup/user" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors mt-1"
                    onClick={toggleMobileMenu}
                  >
                    <img src="./src/assets/avatar.png" alt="User" className="w-5 h-5 mr-2" />
                    <span>User</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/Signup" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors mt-1"
                    onClick={toggleMobileMenu}
                  >
                    <img src="./src/assets/avatar.png" alt="Admin" className="w-5 h-5 mr-2" />
                    <span>Admin</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
