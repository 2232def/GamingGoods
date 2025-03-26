import React from "react";
import { productsSortData } from "../../utils/data";

function Products_sort() {
  return (
    <div className="my-[20px] grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-[10px] gap-[20px]">
      {productsSortData.map(({ title, options }, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h1 className="font-inter font-bold opacity-80 uppercase text-xs">
            {title}
          </h1>
          <select className="border-[1px] border-black border-opacity-20 outline-hidden sm:text-sm text-xs bg-[#F8F8F8] h-[45px] px-[10px] rounded-md font-inter font-medium text-sm opacity-80">
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <h1 className="font-inter font-bold opacity-80 uppercase text-xs">
          search by
        </h1>
        <input
          type="text"
          className="border-[1px] border-black border-opacity-20 outline-hidden sm:text-sm text-xs h-[45px] px-[10px] rounded-md font-inter font-medium text-sm opacity-80"
          placeholder="id / name / category / brand"
        />
      </div>
    </div>
  );
}

export default Products_sort;
