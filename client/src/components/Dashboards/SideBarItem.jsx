import React, { useState } from "react";
import { MdDashboard, MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import User_profile from "./User_profile";
const SideBarItem = ({ data: { Icon, title, details, items, note } }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="w-full h-[50px]  rounded-lg flex justify-between items-center cursor-pointer
        transition-all duration-200 ease-in-out px-[10px] "
        onClick={() => setShowDetail(!showDetail)}
      >
        <div className="flex items-center h-full gap-[7px] ">
          <Icon size={22} />
          <h1 className="font-inter text-sm font-medium ">{title}</h1>
        </div>
        <div className="flex gap-5 items-center">
          {note != "" && (
            <div
              className={`px-[5px] py-[2px] text-[8px] text-white font-inter font-bold rounded-sm
            ${note == "HOT" ? "bg-[#0858F7]" : "bg-red-600"}`}
            >
              {note}
            </div>
          )}
          {details.length > 0 && (
            <MdArrowRight
              size={25}
              className={`${showDetail ? "text-[#0858F7]" : "text-gray-600"} ${
                showDetail ? "rotate-90" : "rotate-0"
              } transition-all duration-200 ease-in-out `}
            />
          )}
        </div>
      </div>
      {showDetail && details.length > 0 && (
        <div className="ml-[20px] border-l-[1px] border-black  ">
          {details.map((detail, index) => (
            <Link
              key={index}
              to={
                detail === "User Profile"
                  ? "/Owner_dashboard/user-profile"
                  : detail === "My Account"
                  ? "/Owner_dashboard/my-account"
                  : detail === "Dashboard"
                  ? "/Owner_dashboard/dashboard"
                  : detail === "Product Upload"
                  ? "/Owner_dashboard/Productupload"
                  : detail === "Product View"
                  ? "/Owner_dashboard/Product-view"
                  : "#"
              }
              className="pl-[20px] h-[40px] flex items-center font-inter font-normal text-sm 
                hover:border-r-[3px] hover:border-[#0858F7]  cursor-pointer 
                transition-all duration-200 ease-in-out "
            >
              {detail}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBarItem;
