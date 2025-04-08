import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../zustand/cartStore";
import StyledAddToCartButton from "../shared/StyledAddToCartButton"; // import here

function Cards({ product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="relative h-[400px] w-full max-w-sm rounded-2xl overflow-hidden shadow-md group transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      
      {/* Image Section */}
      <div
        onClick={() => navigate(`/productDetails/${product._id}`)}
        className="cursor-pointer h-[60%] md:group-hover:h-[60%] transition-all duration-300"
      >
        <img
          src={product.images}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition-transform duration-300 md:group-hover:scale-105"
        />
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-full h-[37%] md:group-hover:h-[37%] bg-blue-950 text-white transition-all duration-500 ease-in-out flex flex-col justify-between px-5 py-3 overflow-hidden">
        
        {/* Title */}
        <div className="transition-all duration-300 md:group-hover:-translate-y-2">
          <h5 className="text-lg font-semibold line-clamp-2">{product.name}</h5>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4 transition-all duration-500 ease-in-out 
                        md:transform md:translate-y-full md:opacity-0 
                        md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <span className="text-xl font-bold">${product.price}</span>
          <StyledAddToCartButton
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product._id, 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
