import React from "react";
import Product_header from "./Product_header";
import { useState, useEffect } from "react";
import Product_view from "./Product_view";
import { jwtDecode } from "jwt-decode";

function Product_listing({  setOwner ,owner}) {

  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    price: "",
    discount: "",
    createdAt: "",
  });
  const [products, setProducts] = useState([]);
  console.log(products)
  const [showProductView, setShowProductView] = useState(false);
  const [token, setToken] = useState("");

  function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  useEffect(() => {
    let savedToken = getCookie("token");
    if (!savedToken) {
      savedToken = localStorage.getItem("token");
    }
    console.log("Retrieved token:", savedToken);
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        console.log("Decoded token:", decoded);
        if (decoded && decoded.id) {
          setOwner(decoded);
          // Also persist the token in localStorage so it's available on reload
          localStorage.setItem("token", savedToken);
        } else {
          console.error("Decoded token does not contain _id");
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Owner passed to Product_listing:", owner);
  }, [owner]);

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!owner) {
      alert("Please enter your unique ownerID");
      return;
    }
    console.log("Owner ID to be used:", owner._id);

    const data = new FormData();
    data.append("title", formData.title);
    // data.append("ownerID", owner._id);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("createdAt", formData.createdAt);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/product_route/products",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorRes = await response.json();
        console.error("Error uploading product:", errorRes);
        return;
      }
      const newProduct = await response.json();
      console.log("New product:", newProduct);
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  // useEffect(() => {
  //   console.log("Fetching products...");
  //   fetchProducts();
  // }, [formData.ownerID]);

  return (
    <div className="w-full h-screen transition-all duration-200 ease-in-out sm:p-[20px] p-[9px] overflow-y-scroll scrollbar">
      <Product_header />
      <div className="grid  md:grid-cols-3 grid-cols-1 my-[20px] gap-[20px]">
        <div className="bg-red-400 h-full col-span-2 p-4.5 ">
          <h1 className="text-2xl bold">Basic Information</h1>
          <form
            className="mt-4 "
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <span className="text-xl">Title :</span> <br />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handlechange}
                className="bg-gray-100 w-full h-10 outline-hidden pl-4 rounded-md"
                placeholder="Type here...."
              />
            </div>
            <div className="mt-4">
              <span className="text-xl"> Description :</span>
              <br />
              <textarea
                name="description"
                id=""
                value={formData.description}
                onChange={handlechange}
                placeholder="Type here...."
                className="bg-gray-100 w-full h-48 p-4 rounded-md "
              ></textarea>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-[20px]">
              <div>
                <span>Category</span>
                <input
                  type="text"
                  placeholder="Type here...."
                  className="bg-gray-100 w-full pl-4 h-10 rounded-md outline-hidden "
                />
              </div>
              <div>
                <span>Brand</span>
                <input
                  type="text"
                  placeholder="Type here...."
                  className="bg-gray-100 w-full pl-4 h-10 rounded-md outline-hidden "
                />
              </div>
              <div>
                <span>Regular Price</span>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handlechange}
                  type="number"
                  placeholder="Type here...."
                  className="bg-gray-100 w-full pl-4 h-10 rounded-md outline-hidden "
                />
              </div>
              <div>
                <span>Discount</span>
                <input
                  name="discount"
                  value={formData.discount}
                  onChange={handlechange}
                  type="number"
                  placeholder="Type here...."
                  className="bg-gray-100 w-full pl-4 h-10 rounded-md outline-hidden "
                />
              </div>
              <div>
                <span>Shipping Fee</span>
                <input
                  type="text"
                  placeholder="Type here...."
                  className="bg-gray-100 w-full pl-4 h-10 rounded-md outline-hidden "
                />
              </div>
              <div>
                <span>Tax Rate</span>
                <input
                  type="text"
                  placeholder="Type here...."
                  className="bg-gray-100 w-full pl-4 h-10 rounded-md outline-hidden "
                />
              </div>
            </div>
            <div className="my-4">
              <span>Tags:</span>
              <textarea
                name=""
                placeholder="Type here...."
                id=""
                className="w-full bg-gray-100 h-48 p-4 rounded-md outline-hidden "
              ></textarea>
            </div>

            <button type="submit" className="bg-red-500">
              {" "}
              Submit
            </button>
          </form>
        </div>
        <div className="grid grid-rows-2">
          <div className="bg-blue-500 ">
            <div className="p-4 ">
              <h1 className="text-2xl bold">Organisation</h1>
              <span className="">Add Category</span>
              <br />
              <input
                type="text"
                className="w-[80%] bg-gray-100 h-10 pl-4 rounded-md outline-hidden "
              />
            </div>
          </div>
          <div className="bg-red-300 my-[20px]"></div>
        </div>
      </div>
      <div className="w-full bg-red-300 h-[30rem] my-20"></div>
      {showProductView && (
        <Product_view
          products={products}
          owner={owner}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}

export default Product_listing;
