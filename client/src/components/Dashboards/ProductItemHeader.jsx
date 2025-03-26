import React from 'react'

function ProductItemHeader() {
  return (
    <div className={`w-full flex h-[50px] bg-[#1F67FE]`}>
      <div
        className="w-[100px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20 "
      >
        <input
          type="checkbox"
          className="w-[16px] h-[16px] accent-[#216AF8]"
        />
        <h1 className={`uppercase text-sm font-inter font-bold text-white`}>
          uid
        </h1>
      </div>

      <div
        className="w-[180px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          Product
        </h1>
      </div>

      <div
        className="w-[120px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          category
        </h1>
      </div>

      <div
        className="w-[100px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          brand
        </h1>
      </div>

      <div
        className="w-[100px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          price
        </h1>
      </div>

      <div
        className="w-[100px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          stock
        </h1>
      </div>

      <div
        className="w-[120px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          rating
        </h1>
      </div>

      <div
        className="w-[100px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          order
        </h1>
      </div>

      <div
        className="w-[100px] h-[full] px-[10px] flex items-center gap-[5px] border-r-[1px] border-white
        border-opacity-20"
      >
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          sales
        </h1>
      </div>

      <div className="w-[150px] h-[full] px-[10px] flex items-center gap-[5px]">
        <h1 className="uppercase text-xs font-inter font-bold text-white">
          action
        </h1>
      </div>
    </div>
  )
}

export default ProductItemHeader