import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function Cart({ visible, onClose }) {
  const {
    cart,
    loading,
    error,
    removeFromCart,
    updateQuantity,
    calculateTotal,
  } = useCart();

  const totalPrice = calculateTotal();

  const appStyle = {
    fontFamily: "'Monospace',Lucida Console",
  };

  if (!visible) return null;

  return (
    <article className="relative">
      <div
        onClick={onClose}
        className="btn absolute left-[54rem] bg-white hover:bg-red-600 text-red-700"
      >
        X
      </div>
      <div
        style={appStyle}
        className="cart w-[40vw] h-[100vh] bg-red-100 fixed right-0 flex flex-col items-center"
      >
        {/* Display error message if any */}
        {error && (
          <div className="bg-red-500 text-white p-2 w-full text-center">
            {error}
          </div>
        )}

        {/* Display loading state */}
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {!loading && cart.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {cart.map((item) => {
          {
            console.log(item);
          }
          return (
            <div
              className="Cart_box w-[38vw] flex border-2 border-red-300 bg-white p-3 items-center mt-7 rounded-lg p-5 mb-4"
              key={item.id}
            >
              <div className="Cart_img flex gap-7 items-center">
                <img
                  src={item.imageSrc}
                  className="size-[3.5rem] border-4 border-red-200 rounded-md"
                  alt=""
                />
                <p className="w-24">{item.name}</p>
              </div>
              <div className="mx-24 flex gap-3">
                <button onClick={() => updateQuantity(item, +1)}>+</button>
                <button>{item.amount}</button>
                <button onClick={() => updateQuantity(item, -1)}>-</button>
              </div>
              <div className="flex gap-7 items-center">
                <span>{item.price}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          );
        })}
        {!loading && cart.length > 0 && (
          <div className="w-[38vw] bg-white p-4 mt-4 rounded-lg border-2 border-red-300 flex justify-between">
            <span className="font-bold">Total Price:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default Cart;
