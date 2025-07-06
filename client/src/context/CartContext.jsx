import React, { Children, useContext } from "react";
import {
  isUserLoggedIn,
  getLocalCart,
  saveLocalCart,
  fetchCartFromAPI,
  addToCartAPI,
  removeFromCartAPI,
} from "../utils/cartUtils";
import { createContext } from "vm";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCart = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isUserLoggedIn) {
        const apiCart = await fetchCartFromAPI();

        if (apiCart) {
          const transformedCart = apiCart.items.map((item) => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            amount: item.quantity,
          }));
          setCart(transformedCart);
        } else {
          setCart(getLocalCart());
        }
      } else {
        setCart(getLocalCart());
      }
    } catch (err) {
      setError("Failed to load cart. Please try again.");
      console.error("Cart loading error:", err);
      setCart(getLocalCart());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (item) => {
    try {
      const isPresent = cart.some((product) => product.id === item.id);

      if (isPresent) {
        setError("Item already in cart");
        setTimeout(() => {
          setError(null);
        }, 2000);
        return false;
      }

      const newItem = { ...item, amount: 1 };
      const newCart = [...cart, newItem];

      if (isUserLoggedIn()) {
        const result = await addToCartAPI(item);
        if (!result) {
          throw new Error("Failed to add item to cart via API");
        }
      }
      setCart(newCart);
      saveLocalCart(newCart);
      return true;
    } catch (error) {
      setError("Failed to add item to cart. Please try again.");
      console.error("Error adding item to cart:", error);
      return false;
    }
  };

  const removeFromCart = async (id) => {
    try {
      const newCart = cart.filter((item) => item.id !== id);

      if (isUserLoggedIn()) {
        const result = await removeFromCartAPI(id);
        if (!result) {
          throw new Error("Failed to remove item from cart via API");
        }
      }

      setCart(newCart);
      saveLocalCart(newCart);
      return true;
    } catch (error) {
      setError("Failed to remove item from cart. Please try again.");
      console.error("Error removing item from cart:", error);
      return false;
    }
  };

  const updateQuantity = async (item, change) => {
    try {
      const index = cart.findIndex((product) => product.id === item.id);
      if (index === -1) return false;

      const newCart = [...cart];
      newCart[index] = {
        ...newCart[index],
        amount: Math.max(1, newCart[index].amount + change),
      };

      if (isUserLoggedIn()) {
        // For logged-in users, implement API update
        // This would require adding an updateCart endpoint
        // For now, we'll simulate by removing and re-adding
        await removeFromCartAPI(item.id);
        await addToCartAPI({ ...item, quantity: newCart[index].amount });
      }

      // Update local state
      setCart(newCart);
      // Always update localStorage as backup
      saveLocalCart(newCart);
      return true;
    } catch (err) {
      setError("Failed to update cart quantity");
      console.error("Update quantity error:", err);
      return false;
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.amount, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
