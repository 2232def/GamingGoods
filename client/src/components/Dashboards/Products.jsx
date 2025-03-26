import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiArrowDropLeftFill, RiArrowDropRightLine } from "react-icons/ri";
import Products_sort from "./Products_sort";
import ProductItems from "./ProductItems";

function Products() {
  return (
    <div className="w-full sm:p-[20px] p-[10px] py-[20px] rounded-md shadow-sm hover:shadow-lg transition-all duration-200 easy-in-out">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-inter sm:text-lg text-base font-bold">Best Selling Products</h1>
        <BsThreeDots className="opacity-60 sm:text-2xl text-lg cursor-pointer"/>
      </div>
      <Products_sort/>
      <ProductItems/>
      <div className="w-full h-[60px] mt-[20px] flex justify-between sm:flex-row flex-col items-center gap-[10px]"></div>
    </div>
  );
}

export default Products;
