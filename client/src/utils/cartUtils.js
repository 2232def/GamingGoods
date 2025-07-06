export const isUserLoggedIn = () => {
  const token = document.cookie
    .split(";")
    .find((row) => row.startsWith("token="));
  return token ? true : false;
};

export const getCurrentUserId = () => {
  try {
    const token = document.cookie
      .split(";")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (error) {
    console.error("Error getting userId from token:", error);
    return null;
  }
};

export const saveLocalCart = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const getLocalCart = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error getting cart from localStorage:", error);
    return [];
  }
};

export const clearLocalCart = () => {
  try {
    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Error clearing cart from localStorage:", error);
  }
};

export const addToCartAPI = async (product, quantity = 1) => {
  const userId = getCurrentUserId();
  if (!userId) return false;

  try {
    const response = await fetch("http://localhost:8000/cart/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to add item to cart ");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding item to cart via api:", error);
    return false;
  }
};

export const fetchCartFromAPI = async () => {
  const userId = getCurrentUserId();
  if (!userId) return null;

  try {
    const response = await fetch(`http://localhost:8000/cart/cart/${userId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error("Cart not found for user:", userId);
        return { items: [] };
      }
      throw new Error(`Error fetching cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart from API:", error);
    return null;
  }
};

export const removeFromCartAPI = async (productId) => {
  const userId = getCurrentUserId();
  if (!userId) return false;

  try {
    const response = await fetch(
      `http://localhost:8000/cart/remove/${userId}/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error removing item from cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error removing item from cart via api:", error);
    return false;
  }
};

export const mergeCartOnLogin = async () => {
  try {
    const localCart = getLocalCart();
    if (!localCart.length) return true;

    for (const item of localCart) {
      await addToCartAPI(item, item.amount || 1);
    }

    clearLocalCart();
    return true;
  } catch (error) {
    console.error("Error merging cart on login:", error);
    return false;
  }
};
