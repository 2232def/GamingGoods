export const fetchProducts = async (setProducte) => {
  try {
    const res = await fetch(
      "http://localhost:8080/product_route/products_get",
      {
        credentials: "include",
      }
    );
    if (!res.ok) {
      const errorRes = await res.json();
      console.error("Error fetching products:", errorRes);
      return;
    }
    const data = await res.json();
    setProducte(data);

    console.log("Products fetched:", setProducte(data));
    // console.log("Products fetched:", setShows(data));
  } catch (error) {
    return console.error("Error:", error);
  }
};
