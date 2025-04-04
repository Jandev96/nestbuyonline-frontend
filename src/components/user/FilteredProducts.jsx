import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../zustand/productStore";
import { useCartStore } from "../../zustand/cartStore";
import Cards from "./Cards";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function FilteredProducts() {
  const navigate = useNavigate();
  const { products, fetchProducts, isLoading, error } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <p className="text-center text-lg text-blue-500">Loading products...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  if (products.length === 0) return <p className="text-center text-lg">No products available.</p>;

  const categories = ["All", ...new Set(products.map((product) => product.category[0] || "Uncategorized"))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category[0] === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category[0] || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // below 1024px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // below 640px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Category Carousels */}
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{category}</h2>
          <Slider {...sliderSettings}>
            {groupedProducts[category].map((product) => (
              <div key={product._id} className="px-2">
                <Cards product={product} />
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}

export default FilteredProducts;
