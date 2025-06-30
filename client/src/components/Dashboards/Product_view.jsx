import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product_view_header from "./Product_view_header";
import { fetchProducts } from "../../utils/fetchProducts";

function // In d:\Users\Lenovo\Downloads\GamingGoods\server\controllers\productController.js
exports.getProductsByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const products = await Product.find({ ownerID: ownerId });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by owner:", error);
    return res.status(500).json({ error: error.message });
  }
};Product_view({}) {
  const [producte, setProducte] = useState([]);

  const handleDelete = async (productId, setProducte) => {
    try {
      const res = await fetch(
        `http://localhost:8080/product_route/products_delete/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) {
        const errorRes = await res.json();
        console.error("Error deleting product:", errorRes);
        return;
      }
      const result = await res.json();
      console.log("Delete result:", result);
      setProducte((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      return console.error("Error during deletion:", error);
    }
  };

  useEffect(() => {
    fetchProducts(setProducte);
  }, []);

  console.log("Products:", producte);
  if (!producte || producte.length === 0) {
    return <p>No products.</p>;
  } else {
    return (
      <div className="w-full  h-screen transition-all duration-200 ease-in-out sm:p-[20px] p-[9px]  overflow-scroll scrollbar">
        <Product_view_header />
        <h1 className=" ">Products List</h1>
        <div className="flex-wrap flex justify-center gap-20">
          {producte.map((product) => (
            <div key={product._id} className="w-[30rem] h-[30rem] p-4 ">
              <div className="w-[30rem] h-[30rem] bg-red-300 p-4 rounded-md overflow-hidden">
                <div className=" grid md:grid-cols-3 gap-5 ">
                  <div className="w-36 h-36 bg-gray-200 ">
                    <img src="" alt="" />
                    Image
                  </div>
                  <div className="bg-gray-200 h-36 p-2 col-span-2 ">
                    <h1 className="text-xl font-bold">{product.title}</h1>
                    <h1 className="text-xl">category</h1>
                    <div className="colors">Color selector</div>
                  </div>
                </div>
                <div className=" grid md:grid-cols-3 gap-4">
                  <div className="h-20 w-28 mt-3 bg-gray-300">
                    <h1>{product.price}</h1>
                  </div>
                  <div className="h-20 w-28 mt-3 bg-gray-300">
                    <h1>{product.discount}</h1>
                  </div>
                  <div className="h-20 w-28 mt-3 bg-gray-300">
                    <h1>
                      Created: {new Date(product.createdAt).toLocaleString()}
                    </h1>
                  </div>
                  <div className="h-20 w-full mt-3 col-span-2 bg-gray-300">
                    <h1>{product.description}</h1>
                  </div>
                  {product.image && (
                    <div
                      src={`http://localhost:8080/images_upload/${product._id}`}
                      className="h-34 w-full bg-gray-200 col-span-3 "
                    ></div>
                  )}
                </div>
                <div className="flex gap-3 mt-3 justify-center">
                  <Link
                    to={`/Owner_dashboard/Products_edit/${product._id}`}
                    state={product}
                    className="btn bg-red-400 h-8 w-15 cursor-pointer text-center p-2"
                  >
                    Edit
                  </Link>
                  <a className="btn bg-red-400 h-8 w-15 cursor-pointer text-center p-2">
                    View
                  </a>
                  <a
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-red-400 h-8 w-15 cursor-pointer text-center p-2"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Product_view;
