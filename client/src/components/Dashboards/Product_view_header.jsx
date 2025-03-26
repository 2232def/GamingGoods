import React from 'react'

function Product_view_header() {
  return (
    <div
    className="w-full px-[10px] py-[20px] shadow-sm hover:shadow-lg flex sm:flex-row flex-col justify-between gap-5
      items-center rounded-md transition-all duration-200 ease-in-out mb-[20px]"
  >
    <h1 className="font-inter sm:text-xl text-lg font-bold">User Profile</h1>
    <div className="flex items-center gap-2">
      <h1 className="font-inter font-normal text-base text-[#0858F8] cursor-pointer hover:underline">
        Home
      </h1>
      <h1 className="font-inter font-normal text-lg text-black">-</h1>
      <h1 className="font-inter font-normal text-base text-[#0858F8] cursor-pointer hover:underline">
        Products
      </h1>
      <h1 className="font-inter font-normal text-lg text-black">-</h1>
      <h1 className="font-inter font-normal text-base">Product lists</h1>
    </div>
  </div>
  )
}

export default Product_view_header