import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import {
  navBlocksData,
  navMasterData,
  navSupportsData,
} from "../../utils/sidebarData";
import SideBarItem from "./SideBarItem";

function Sidebar() {
  return (
    <div className="sm:w-[300px] bg-red-300 w-full px-[20px] top-0 h-screen overflow-y-scroll pb-[100px] fixed lg:static lg:pt-[20px] pt-[100px]">
      <div className="w-full flex flex-col gap-[30px]">
        <div>
          <h1 className="text-sm text-black  font-inter font-medium uppercase">
            Master
          </h1>
          <div className="w-full flex flex-col my-[10px]">
            {navMasterData.map((data, index) => (
              <SideBarItem key={index} data={data} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-sm text-black font-inter font-medium uppercase">
            Blocks
          </h1>
          <div className="w-full flex flex flex-col my-[10px]">
            {navBlocksData.map((data, index) => (
              <SideBarItem key={index} data={data} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-sm text-black font-inter font-medium uppercase">
            supports
          </h1>
          <div className="w-full flex flex-col my-[10px]">
            {navSupportsData.map((data, index) => (
              <SideBarItem key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
