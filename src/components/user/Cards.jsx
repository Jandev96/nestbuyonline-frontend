import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../zustand/cartStore";

function Cards({ product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className=" h-[400px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
      {/* Product Image (Navigates to Product Details) */}
      <div
        className="p-4 rounded-t-lg cursor-pointer flex justify-center items-center h-48"
        onClick={() => navigate(`/productDetails/${product._id}`)}
      >
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="px-5 pb-5 flex flex-col flex-grow">
        {/* Product Name */}
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
          {product.name}
        </h5>

        {/* Product Rating */}
        <div className="flex items-center mt-2 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating) ? "text-yellow-300" : "text-gray-200"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {product.rating}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              e.stopPropagation(); // Prevents card click from triggering navigation
              
               addToCart(product._id, 1)
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
