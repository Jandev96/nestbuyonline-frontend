import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../zustand/cartStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Cards({ product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="relative w-96 h-[36rem] rounded-lg overflow-hidden cursor-pointer text-white shadow-xl group">
      <img
        src={product.images}
        alt={product.category}
        className="absolute object-contain w-full h-full top-0 left-0 opacity-90 transition-opacity duration-200 ease-out group-hover:opacity-100"
      />
      <h2 className="absolute left-8 bottom-8 uppercase font-roboto-condensed font-normal transition-all duration-300 ease-out group-hover:bottom-56">
        {product.name}
      </h2>
      <div className="absolute left-8 bottom-10 flex gap-3 opacity-0 transition-opacity duration-500 ease-in group-hover:opacity-100">
        <button
          onClick={() => navigate(`/productDetails/${product?._id}`)}
          className="flex items-center gap-1 text-white hover:text-gray-200 font-medium"
        >
          Details
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
        <button
          onClick={() => addToCart(product._id, 1)}
          className="bg-white text-gray-900 font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Cards;
