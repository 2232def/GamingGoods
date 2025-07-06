import React, { useState, useContext, useEffect } from "react";
import Popup from "./Popup";
import { fetchProducts } from "../utils/fetchProducts";
import { useCart } from "../context/CartContext";

// const items = [
//   {
//     id: 1,
//     name: "Keyboard",
//     href: "#",
//     imageSrc:
//       "https://rukminim2.flixcart.com/image/612/612/xif0q/keyboard/gaming-keyboard/h/o/x/fireblade-led-backlit-evofox-original-imah5yyxkf6mauzv.jpeg?q=70",
//     price: "35",
//     color: "Black",
//     amount: 1,
//   },
//   {
//     id: 2,
//     name: "Gaming Controler",
//     href: "#",
//     imageSrc:
//       "https://m.media-amazon.com/images/I/51fCmfd8CML._AC_UY327_FMwebp_QL65_.jpg",
//     price: "35",
//     color: "Black",
//     amount: 1,
//   },
//   {
//     id: 3,
//     name: "Mouse",
//     href: "#",
//     imageSrc:
//       "https://rukminim2.flixcart.com/image/612/612/xif0q/mouse/7/8/l/-original-imah7yzmfz7ndfkz.jpeg?q=70",
//     price: "35",
//     color: "Brown",
//     amount: 1,
//   },
// ];

function Products() {
  // const [shows, setShows] = useState([]);
  const [producte, setProducte] = useState([]);
  const [showData, setData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [warning, setWarning] = useState(false);
  const { cart, addToCart, loading, error } = useCart();

  const handleOnClose = () => {
    setData(false);
  };

  const handleClick = async (item) => {
    console.log(item);
    setSelectedItem(item);
    // let isPresent = false;
    // cart.forEach((product) => {
    //   if (item.id === product.id) isPresent = true;
    // });

    // if (isPresent) {
    //   setWarning(true);
    //   setTimeout(() => {
    //     setWarning(false);
    //   }, 2000);
    //   return;
    // }
    // setCart([...cart, item]);

    const success = await addToCart(item);
    if (!success) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    }
  };

  // const handleChange = (item, d) => {
  //   let ind = -1;
  //   cart.forEach((data, index) => {
  //     if (data.id === item.id) ind = index;
  //   });
  //   const tempArr = cart;
  //   tempArr[ind].amount += d;

  //   if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
  //   setCart([...tempArr]);
  // };

  useEffect(() => {
    fetchProducts(setProducte);
  }, []);
  console.log("Products:", producte);
  
  return (
    <>
      <div className="w-full relative  bg-white flex">
        <div className="category w-64 h-[44rem] bg-red-200 flex-col">
          <h1 className=" text-2xl p-8">Color</h1>
          <ul className="px-9 flex flex-col gap-4 text-xl">
            <li type="checkbox" className="">
              Black
              <input className="ml-2" type="checkbox" />
            </li>
            <li type="checkbox" className="">
              Red
              <input className="ml-2" type="checkbox" />
            </li>
            <li type="checkbox" className="">
              Blue
              <input className="ml-2" type="checkbox" />
            </li>
            <li type="checkbox" className="">
              Yellow
              <input className="ml-2" type="checkbox" />
            </li>
            <li type="checkbox" className="">
              Pink
              <input className="ml-2" type="checkbox" />
            </li>
          </ul>
        </div>
        <div className="p-8 w-full z-[0]">
          <div className="">
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Our Products
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {producte.map((product) => (
                    <div
                      key={product._id}
                      className="group relative rounded-md bg-gray-100 border-8 border-gray-100 p-3"
                    >
                      <div className="aspect-square">
                        <img
                          alt=""
                          src={product.imageSrc}
                          className=" rounded-md mix-blend-darken group-hover:opacity-75 object-fill"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                              <span aria-hidden="true" className="absolute" />
                              {product.title}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      <div>
                        <a
                          className="btn flex items-center mt-4 bg-white border-gray-400 text-xl bg-red hover:bg-red-500"
                          onClick={(e) => {
                            setSelectedItem(product), setData(true);
                          }}
                        >
                          Go to store
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {selectedItem && (
          <Popup
            size={cart.length}
            item={selectedItem}
            handleClick={handleClick}
            visible={showData}
            onClose={handleOnClose}
            warning={warning}
            cart={cart}
          />
        )}
      </div>
    </>
  );
}

export default Products;
