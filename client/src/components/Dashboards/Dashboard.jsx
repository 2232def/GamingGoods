import React from "react";
import { mainItemData } from "../../utils/data";
import Dashboard_header from "./Dashboard_header";
import Dashboard_Status_Card from "./Dashboard_Status_Card";
import Products from "./Products";

function Dashboard() {
  return (
    <div className="w-full h-screen transition-all duration-200 ease-in-out sm:p-[20px] p-[9px] overflow-scroll scrollbar">
      <Dashboard_header />
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-[20px]">
        <div className="grid md:grid-cols-2 grid-cols-1 my-[30px] gap-[20px]">
          {mainItemData.map((data, index) => (
            <Dashboard_Status_Card data={data} key={index} />
          ))}
        </div>
        <div className="bg-gray-300 my-[30px] rounded-md"></div>
      </div>
      <Products />
    </div>
  );
}

export default Dashboard;
