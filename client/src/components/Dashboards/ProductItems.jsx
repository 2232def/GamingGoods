import React from "react";

import ProductItemHeader from "./ProductItemHeader";
import ProductItemCard from "./ProductItemCard";
import { productItems } from "../../utils/data";

function ProductItems() {
  return (
    <div className="w-full overflow-x-scroll scrollbar">
      <div className="lg:w-[1370px] w-[1170px]">
        <ProductItemHeader />
        {productItems.map((data, index) => (
          <ProductItemCard key={index} data={data} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ProductItems;
