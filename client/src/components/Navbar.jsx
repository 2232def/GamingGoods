import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const appStyle = {
  fontFamily: "'Verdana', Sans-serif",
};

const NavLink = ({ to, className, children }) => (
  <Link
    to={to}
    className={`text-xl bg-red-100 text-red-500 cursor-pointer ${className} relative `}
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

  return (
    <>
      <div
        style={appStyle}
        className="navbar  flex justify-around items-center z-[-2] "
      >
        <div className="navbar-start ">
          <ul className="flex gap-46">
            <div className="about bg-red-200" >
              <NavLink className="mx-8 bg-red-200">
                <span > About </span>
              </NavLink>
            </div>
            <NavLink to="/Newsletters">Blog</NavLink>
          </ul>
        </div>
        <div className="navbar-center bg-red-100 rounded-full p-4 z-[1]  m-[-1rem] overflow-hidden">
          <NavLink to="/" className="text-3xl object-cover">
            <img
              src="./src/assets/Logo.png"
              className="w-[10rem] mix-blend-darken"
              alt=""
            />
          </NavLink>
        </div>
        <div className="navbar-end ">
          <ul className="flex  gap-46 cursor-pointer">
            <NavLink to="/Products" className="prod">
              <span> Products </span>
            </NavLink>
            <NavLink to="/Signup" className="">
              <img src="./src/assets/avatar.png" alt="" />
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
