import React from "react";
import { useLocation, useNavigate, useParams , Link } from "react-router-dom";
import Product_header from "./Product_header";
import { useState, useEffect } from "react";

function Product_edit() {
  const { id } = useParams();
  const location = useLocation(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title:  "",
    description:  "",
    price:  "",
    discount:"",
    image: null,
  });

  useEffect(()=>{
    if(location.state && location.state.product){
      const product = location.state.product;
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        discount: product.discount || "",
        image: null,
      })
    }
    else{
      const fetchProduct = async () => {
        try{
        const res = await fetch(`http://localhost:8080/product_route/products_get/${id}`, {
        credentials:"include"
        })
        if(!res.ok){
          throw new Error("Product not found");
        }
        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          discount: data.discount || "",
          image: null,
        })
      }
      catch(error){
        console.error("Error fetching product", error);
      }
    }
    if (id) {
      fetchProduct();
    }
    }
  } , [id]);

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append("title", formData.title);
    updateData.append("description", formData.description);
    updateData.append("price", formData.price);
    updateData.append("discount", formData.discount);
    if (formData.image) {
      updateData.append("image", formData.image);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/product_route/products_edit/${id}`,
        {
          method: "PUT",
          body: updateData,
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorRes = await response.json();
        console.error("Error updating product:", errorRes);
        return;
      }
      const updatedProduct = await response.json();
      console.log("Product updated:", updatedProduct);
      navigate("/product_view")
      
    } catch (error) {
      return console.error("Error updating product:", error);
    }
  };

  return (
    <div className="w-full h-screen transition-all duration-200 ease-in-out sm:p-[20px] p-[9px] overflow-y-scroll scrollbar">
      <Product_header />
      <div className="grid  md:grid-cols-3 grid-cols-1 my-[20px] gap-[20px]">
        <div className="bg-red-400 h-full col-span-2 p-4.5 ">
          <h1 className="text-2xl bold">Basic Information</h1>
          <form
            className="mt-4 "
            onSubmit={handleUpdate}
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
    </div>
  );
}

export default Product_edit;
