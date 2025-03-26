import React from "react";
import "../../assets/logo.webp";
import {
  MdMenu,
  MdMenuOpen,
  MdShoppingCart,
  MdEmail,
  MdNotifications,
  MdArrowDropDown,
} from "react-icons/md";
import { NavbarButton } from "./Stylecomponent";
import { FiSearch } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";

function Navbar_dashboard() {
  return (
    <div className="w-full fixed top-0 bg-linear-to-r/increasing from-red-400 to-red-600 ">
      <div className="flex items-center justify-between h-[86px] lg:px-[20px] px-[10px]">
        <div className="w-1/4 h-full flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img
              src={"../../assets/logo.webp"}
              alt="logo"
              className="w-[45px] h-[45px]"
            />
            <h1 className="font-inter font-extrabold text-2xl uppercase sm:block hidden">
              Gaming Goods
            </h1>
          </div>
        </div>

        <div className="w-1/4 xl:flex hidden h-full pl-[30px]  items-center justify-start gap-5">
          <button
            className="w-[40px] h-[36px] rounded-full flex bg-white  justify-center items-center group 
                            relative opacity-90 hover:opacity-100 transition-all duration-200 ease-in-out "
          >
            <MdMenuOpen size={20} />
          </button>
          <div
            className="w-[250px] h-[40px] flex rounded-md overflow-hidden relative opacity-90 hover:opacity-100
                            transition duration-200 ease-in-out"
          >
            <div className="w-[40px] h-full bg-white flex justify-center items-center">
              <FiSearch size={14} />
            </div>
            <input
              type="text"
              className="bg-[#E6EEFE] w-[210px] h-full border-none outline-hidden text-xs"
              placeholder="Quick Finding"
            />
            <button
              className="absolute top-0 right-0 w-[40px] h-full flex justify-center items-center border-none
                                        outline-hidden"
            ></button>
          </div>
        </div>
        {/* button */}
        <div
          className="xl:w-2/4 w-3/4 flex justify-end sm:gap-5 gap-3 items-center sm:px-[20px] 
      px-0"
        >
          <div className="xl:hidden flex h-full items-center sm:gap-5 gap-3 ">
            <div className="lg:hidden block">
              <NavbarButton>
                <FiSearch
                  className="group-hover:text-[#0858F7] transition-all duration-200 
                ease-in-out"
                />
              </NavbarButton>
            </div>
            <button
              className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full flex justify-center 
              items-center group relative opacity-90 hover:opacity-100 transition-all duration-200 ease-in-out 
        text-black group-hover:text-[#0858F7] "
            ></button>
            <div
              className="w-[250px] h-[40px]  rounded-md overflow-hidden relative opacity-90 hover:opacity-100
        transition duration-200 ease-in-out lg:flex hidden"
            >
              <div className="w-[40px] h-full flex justify-center items-center  ">
                <FiSearch
                  size={16}
                  className="group-hover:text-[#0858F7] transition-all duration-200 
                ease-in-out "
                />
              </div>
              <input
                type="text"
                className="w-[210px] h-full border-none outline-hidden text-sm font-inter"
                placeholder="Quick Finding"
              />
            </div>
          </div>
          <div className="flex items-center sm:gap-5 gap-3 ">
            <NavbarButton>
              <TbWorld
                className=" group-hover:text-[#0858F7] transition-all duration-200 
                ease-in-out "
              />
            </NavbarButton>
            <NavbarButton item={"02"} hidden>
              <MdShoppingCart className="group-hover:text-[#0858F7] transition-all duration-200 ease-in-out " />
            </NavbarButton>
            <NavbarButton item={"03"} hidden>
              <MdEmail className="group-hover:text-[#0858F7] transition-all duration-200 ease-in-out" />
            </NavbarButton>
            <NavbarButton item={"04"} hidden>
              <MdNotifications className="group-hover:text-[#0858F7] transition-all duration-200 ease-in-out " />
            </NavbarButton>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full border-[1px] border-[#0858F7] 
          p-[2px]"
            >
              <img
                src="../../assets/profile.webp"
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex-col gap-[2px] justify-center items-start sm:flex hidden">
              <a href="#" className="font-inter font-semibold text-sm ">
                Denny Kate
                <MdArrowDropDown size={20} className="inline" />
              </a>
              <h1 className="font-inter text-xs font-medium ">@dennykate</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar_dashboard;
