import React, { useState } from "react";
import Cart from "./Cart";

function Popup({
  visible,
  onClose,
  handleClick,
  item,
  size,
  handleChange,
  warning,
  cart,
  setCart,
}) {
  if (!visible) return null;

  const [showCart, setShowCart] = useState(false);
  const handleOnClose = () => {
    setShowCart(false);
  };

  return (
    <section className="w-full h-screen fixed top-0 left-0 backdrop-blur-sm">
      <div>
        {warning && (
          <div className="flex justify-center items-center">
            <span className="text-xl text-white bg-red-600 p-4 w-[33vw] text-center rounded-md ">
              This item is already added to the cart
            </span>
          </div>
        )}
      </div>
      <div className="w-[90vw] h-[80vh] bg-white fixed bottom-0 rounded-md translate-x-20 overscroll-auto">
        <div className="relative">
          <button onClick={onClose} className="absolute top-[-3rem] left-0">
            X
          </button>
          <img
            className="absolute top-[2rem] right-8 size-8 cursor-pointer"
            src="./src/assets/empty-cart.png"
            alt=""
            onClick={() => {
              setShowCart(true);
            }}
          />
          <span className="absolute top-[2rem] right-5 border-2 text-white rounded-full size-4 flex items-center justify-center bg-red-500 border-red-500 size-6">
            {size}
          </span>
        </div>
        <div className="w-full h-full bg-red-400 overflow-auto flex">
          <div className="">
            <div className="w-[80vh] h-[80vh] m-9 bg-red-200 rounded-md">
              <img className="h-full object-fill" src={item.imageSrc} alt="" />
            </div>
            <div className="grid md:grid-cols-4 col-span-2 m-9 w-[50rem] gap-[13rem]">
              <div className="w-[30vh] h-[30vh] bg-red-200 rounded-md "></div>
              <div className="w-[30vh] h-[30vh] bg-red-200 rounded-md "></div>
              <div className="w-[30vh] h-[30vh] bg-red-200 rounded-md "></div>
            </div>
          </div>
          <div className="gap-5 flex flex-col ">
            <h1 className="text-5xl text-wrap pt-12">{item.name}</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              eligendi voluptatibus at repellendus voluptates, non aliquam
              blanditiis nulla! Ea, laboriosam.
            </p>
            <div className="flex gap-8">
              <button
                className="bg-white w-[7rem] p-2 rounded-md border-2"
                onClick={() => handleClick(item)}
              >
                Add to Cart
              </button>
              <button className="bg-white w-[7rem] p-2 rounded-md border-2">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Cart
        visible={showCart}
        cart={cart}
        setCart={setCart}
        handleChange={handleChange}
        onClose={handleOnClose}
      />
    </section>
  );
}

export default Popup;
