import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";

function Dashboard_Status_Card({data: { bg, header, total, Icon, percentage, trendingUp },}) {
  return (
    <>
    <div className={`sm:p-[25px] p-[15px] rounded-md ${bg}`}>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-[3px]">
          <h1 className="font-inter font-medium sm:text-lg text-base text-white">
            {header}
          </h1>
          <h1 className="font-inter font-extrabold sm:text-4xl text-2xl text-white">
            {total}
          </h1>
        </div>
        <div
          className="sm:w-[60px] sm:h-[60px] w-[40px] h-[40px] bg-black bg-opacity-10 rounded-md flex 
        justify-center items-center"
        >
          <Icon className="text-white opacity-70 sm:text-[30px] text-[24px]" />
        </div>
      </div>
      <div className="sm:h-[60px] h-[40px]">
        {trendingUp ? (
          <BiTrendingUp className="text-black opacity-10 sm:-translate-y-12 -translate-y-7 sm:text-[150px] text-[100px]" />
        ) : (
          <BiTrendingDown className="text-black opacity-10 sm:-translate-y-12 -translate-y-7 sm:text-[150px] text-[100px]" />
        )}
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="p-[5px] bg-black bg-opacity-10 rounded-sm text-base font-normal text-white">
            {percentage}
          </div>
          <h1 className="font-inter  rounded-sm sm:text-base text-sm font-normal text-white">
            Last Month
          </h1>
        </div>
        <button className="flex justify-between items-center cursor-pointer">
          <BsThreeDotsVertical className="text-black opacity-60 sm:text-[28px] text-[24px] " />
        </button>
      </div>
    </div>
    </>
  );
}

export default Dashboard_Status_Card;
