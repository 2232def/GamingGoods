import React, { useState, useContext, useEffect } from "react";
import Popup from "./Popup";
import { fetchProducts } from "../utils/fetchProducts";
import { useCart } from "../context/CartContext";

function Products() {
  const [producte, setProducte] = useState([]);
  const [showData, setData] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [warning, setWarning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    priceRange: "",
    categories: [],
    brands: [],
  });
  const [expandedCategories, setExpandedCategories] = useState({
    color: true,
    price: false,
    category: false,
    brand: false,
    mobileMenu: false,
  });

  const { cart, addToCart} = useCart();

  // const handleBtnClick = () => {
  //   console.log("View Product clicked");
  //   alert("View Product clicked");
  // };

  // Filter categories data
  const filterCategories = {
    colors: [
      "Black",
      "Red",
      "Blue",
      "Yellow",
      "Pink",
      "White",
      "Green",
      "Purple",
    ],
    priceRanges: [
      { label: "Under ₹1,000", value: "0-1000" },
      { label: "₹1,000 - ₹5,000", value: "1000-5000" },
      { label: "₹5,000 - ₹10,000", value: "5000-10000" },
      { label: "Above ₹10,000", value: "10000+" },
    ],
    categories: [
      "Gaming Keyboards",
      "Gaming Mouse",
      "Controllers",
      "Headsets",
      "Monitors",
      "Accessories",
    ],
    brands: ["Logitech", "Razer", "SteelSeries", "Corsair", "HyperX", "ASUS"],
  };

  // Sample search suggestions
  const searchSuggestions = [
    "Gaming Keyboard",
    "Wireless Mouse",
    "Gaming Controller",
    "RGB Headset",
    "Gaming Monitor",
    "Mechanical Keyboard",
  ];

  const filteredSuggestions = searchSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleOpenPopup = () => {
  //   setData(true);
  //   setSelectedItem(producte);
  // };

  const handleOnClose = () => {
    setData(false);
  };

  const handleClick = async (e,item) => {
    console.log(item);
    setSelectedItem(item);
    const success = await addToCart(item);
    if (!success) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const handlePriceRangeChange = (value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange === value ? "" : value,
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      colors: [],
      priceRange: "",
      categories: [],
      brands: [],
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchDropdown(e.target.value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  };

  useEffect(() => {
    fetchProducts(setProducte);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSearchDropdown(false);
    };

    if (showSearchDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showSearchDropdown]);

  console.log("Products:", producte);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() =>
              setExpandedCategories((prev) => ({
                ...prev,
                mobileMenu: !prev.mobileMenu,
              }))
            }
            className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Filters & Categories
          </button>
        </div>

        {/* Enhanced Category Sidebar */}
        <div
          className={`w-full lg:w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto ${
            expandedCategories.mobileMenu ? "block" : "hidden lg:block"
          }`}
        >
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                Filters
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearAllFilters}
                  className="text-xs lg:text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() =>
                    setExpandedCategories((prev) => ({
                      ...prev,
                      mobileMenu: false,
                    }))
                  }
                  className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 lg:p-4 space-y-4 lg:space-y-6">
            {/* Color Filter */}
            <div className="border-b border-gray-100 pb-4 lg:pb-6">
              <button
                onClick={() => toggleCategory("color")}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Color
                </h3>
                <svg
                  className={`w-4 h-4 lg:w-5 lg:h-5 transform transition-transform ${
                    expandedCategories.color ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedCategories.color && (
                <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 max-h-32 lg:max-h-40 overflow-y-auto">
                  {filterCategories.colors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.colors.includes(color)}
                        onChange={() => handleFilterChange("colors", color)}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="ml-2 lg:ml-3 flex items-center">
                        <div
                          className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full mr-1 lg:mr-2 border border-gray-300`}
                          style={{
                            backgroundColor:
                              color.toLowerCase() === "black"
                                ? "#000000"
                                : color.toLowerCase() === "white"
                                ? "#ffffff"
                                : color.toLowerCase() === "red"
                                ? "#ef4444"
                                : color.toLowerCase() === "blue"
                                ? "#3b82f6"
                                : color.toLowerCase() === "yellow"
                                ? "#eab308"
                                : color.toLowerCase() === "pink"
                                ? "#ec4899"
                                : color.toLowerCase() === "green"
                                ? "#10b981"
                                : color.toLowerCase() === "purple"
                                ? "#8b5cf6"
                                : "#6b7280",
                          }}
                        />
                        <span className="text-xs lg:text-sm text-gray-700 group-hover:text-gray-900">
                          {color}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="border-b border-gray-100 pb-4 lg:pb-6">
              <button
                onClick={() => toggleCategory("price")}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Price Range
                </h3>
                <svg
                  className={`w-4 h-4 lg:w-5 lg:h-5 transform transition-transform ${
                    expandedCategories.price ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedCategories.price && (
                <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3">
                  {filterCategories.priceRanges.map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedFilters.priceRange === range.value}
                        onChange={() => handlePriceRangeChange(range.value)}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 lg:ml-3 text-xs lg:text-sm text-gray-700 group-hover:text-gray-900">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="border-b border-gray-100 pb-4 lg:pb-6">
              <button
                onClick={() => toggleCategory("category")}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Category
                </h3>
                <svg
                  className={`w-4 h-4 lg:w-5 lg:h-5 transform transition-transform ${
                    expandedCategories.category ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedCategories.category && (
                <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 max-h-32 lg:max-h-40 overflow-y-auto">
                  {filterCategories.categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.categories.includes(category)}
                        onChange={() =>
                          handleFilterChange("categories", category)
                        }
                        className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 lg:ml-3 text-xs lg:text-sm text-gray-700 group-hover:text-gray-900">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Filter */}
            <div className="pb-4 lg:pb-6">
              <button
                onClick={() => toggleCategory("brand")}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                  Brand
                </h3>
                <svg
                  className={`w-4 h-4 lg:w-5 lg:h-5 transform transition-transform ${
                    expandedCategories.brand ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedCategories.brand && (
                <div className="mt-3 lg:mt-4 space-y-2 lg:space-y-3 max-h-32 lg:max-h-40 overflow-y-auto">
                  {filterCategories.brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.brands.includes(brand)}
                        onChange={() => handleFilterChange("brands", brand)}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 lg:ml-3 text-xs lg:text-sm text-gray-700 group-hover:text-gray-900">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
          {/* Enhanced Search Bar */}
          <div className=" top-10 left-4 right-4 lg:static  lg:left-auto lg:right-auto relative max-w-3xl mx-auto mt-4 lg:mt-20 lg:mb-8 z-40">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full pl-8 lg:pl-10 pr-20 lg:pr-24 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md text-sm lg:text-base"
                  placeholder="Search for gaming products..."
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-2 lg:pr-3"
                >
                  <div className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg transition-colors text-sm lg:text-base">
                    Search
                  </div>
                </button>
              </div>
            </form>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 lg:p-4">
                  <h4 className="text-xs lg:text-sm font-medium text-gray-900 mb-2 lg:mb-3">
                    Suggestions
                  </h4>
                  <div className="space-y-1 lg:space-y-2">
                    {filteredSuggestions
                      .slice(0, 5)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSearchDropdown(false);
                          }}
                          className="w-full text-left px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center"
                        >
                          <svg
                            className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400 mr-2 lg:mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          {suggestion}
                        </button>
                      ))}
                  </div>

                  {searchQuery && filteredSuggestions.length === 0 && (
                    <p className="text-xs lg:text-sm text-gray-500 py-2 lg:py-3">
                      No suggestions found
                    </p>
                  )}

                  <div className="pt-2 lg:pt-3 mt-2 lg:mt-3 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <svg
                        className="h-3 w-3 lg:h-4 lg:w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Press Enter to search
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Our Products
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <span className="text-xs lg:text-sm text-gray-600">
                    {producte.length} products found
                  </span>
                  <select className="w-full sm:w-auto border border-gray-300 rounded-md px-2 lg:px-3 py-1 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Rated</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3 lg:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
                {producte.map(
                  (product) => (
                    console.log("Rendering product:", product),
                    (
                      <div
                        key={product._id}
                        className="group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        <div className="aspect-square bg-gray-50 overflow-hidden">
                          <img
                            alt={product.title}
                            src={product.imageSrc}
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Hover Overlay */}
                          <div className=" inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>

                        <div className="p-3 lg:p-4">
                          <div className="mb-2">
                            <h3 className="text-sm lg:text-lg font-semibold text-gray-900 line-clamp-1 leading-tight">
                              {product.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-gray-500 mt-1">
                              {product.color}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 lg:mb-4 gap-2">
                            <div className="flex items-center">
                              <span className="text-lg lg:text-2xl font-bold text-gray-900">
                                ₹{product.price}
                              </span>
                              <span className="text-xs lg:text-sm text-gray-500 line-through ml-1 lg:ml-2">
                                ₹{parseInt(product.price) + 500}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="w-3 h-3 lg:w-4 lg:h-4 fill-current"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs lg:text-sm text-gray-600 ml-1">
                                (4.5)
                              </span>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setData(true);
                                setSelectedItem(product);
                              }}
                              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-1.5 lg:py-2 px-3 lg:px-4 rounded-lg font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm lg:text-base"
                            >
                              View Product
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {selectedItem && showData && (
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
