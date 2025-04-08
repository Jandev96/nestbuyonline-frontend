import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../zustand/cartStore";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [productdetails, isLoading, error] = useFetch(`/product/products/${id}`);
  const product = productdetails?.displaySingleProduct;

  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || "");
  const [pincode, setPincode] = useState("560002");
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (isLoading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">Error: {error.message}</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  return (
    <div className="max-w-7xl mt-16 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage || product.images?.[0]}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded-lg border"
          />
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain rounded-lg border cursor-pointer ${
                  selectedImage === img ? "ring-2 ring-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <span className="text-yellow-500 text-lg">⭐ {product.rating || "4.6"}</span>
            <span className="text-gray-400">|</span>
            <span>{product.reviews || 749} Reviews</span>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>

          {/* Price */}
          <div className="mt-4 text-2xl font-semibold text-gray-900">
            ₹{product.price}
            {product.originalPrice && (
              <span className="text-base line-through text-gray-500 ml-3">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Quantity Control */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-md font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center gap-2 border rounded px-2 py-1">
              <button onClick={decreaseQuantity} className="px-2">-</button>
              <span className="w-6 text-center">{quantity}</span>
              <button onClick={increaseQuantity} className="px-2">+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <Link
              className="btn btn-primary"
              onClick={() => addToCart(product._id, quantity)}
            >
              Add to Cart
            </Link>
            <button className="btn btn-outline">Wishlist</button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg">Delivery & Services</h3>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="input input-bordered w-28"
              />
              <button className="text-blue-500 underline">Check</button>
            </div>
            <p className="mt-2 text-sm text-gray-600">🚚 Delivery by <span className="text-green-600">Tomorrow</span></p>
            <p className="text-sm text-gray-600">🏬 Free Store Pickup Available</p>
            <p className="text-sm text-gray-600">✅ 2 Year Warranty</p>
          </div>
        </div>
      </div>

      {/* Description & Specifications */}
      <div className="mt-12 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2">Product Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Specifications</h3>
        <ul className="text-gray-700 list-disc list-inside">
          {product.specifications
            ? product.specifications.split(",").map((item, idx) => <li key={idx}>{item.trim()}</li>)
            : <li>Standard Size, Lightweight, Durable</li>}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetails;
