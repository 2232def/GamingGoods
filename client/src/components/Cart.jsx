import React, { useEffect, useState } from "react";

function Cart({ visible, onClose, cart, setCart, handleChange}) {

  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => {
      ans += item.price * item.amount;
    });
    setPrice(ans);
  };

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    //handlePrice();
  };

  useEffect(() => {
    handlePrice();
  });

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
                <button  onClick={()=>handleChange(item, +1)}>+</button>
                <button>{item.amount}</button>
                <button  onClick={()=>handleChange(item, -1)}>-</button>
              </div>
              <div className="flex gap-7 items-center">
                <span>{item.price}</span>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <span>Total Price of your Cart</span>
        <span>Rs - {price}</span>
      </div>
    </article>
  );
}

export default Cart;
