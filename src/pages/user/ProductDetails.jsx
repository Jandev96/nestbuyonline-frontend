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
  const [quantity, setQuantity] = useState(1); // 🔸 Track quantity

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (isLoading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">Error: {error.message}</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Product Images */}
      <div>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain border rounded-lg"
          />
        ) : (
          <p>No Image Available</p>
        )}

        <div className="flex gap-3 mt-3 overflow-x-auto">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Product"
              className="w-20 h-20 sm:w-24 sm:h-24 border rounded-lg cursor-pointer hover:opacity-80"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">{product.name}</h1>

        {/* Rating */}
        <p className="text-blue-500 text-sm sm:text-lg font-medium mt-1">
          ⭐ {product.rating || "4.6"} | {product.reviews || 749} reviews
        </p>

        {/* Price + Quantity */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xl sm:text-2xl font-semibold text-gray-800">
            ₹{product.price}
            {product.originalPrice && (
              <span className="text-gray-500 text-base sm:text-xl line-through ml-2">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-outline" onClick={decreaseQuantity}>-</button>
            <span className="text-lg">{quantity}</span>
            <button className="btn btn-sm btn-outline" onClick={increaseQuantity}>+</button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row gap-4">
          <Link
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => addToCart(product._id, quantity)} // 🔸 Pass selected quantity
          >
            Add to Cart
          </Link>
          <button className="btn btn-outline w-full sm:w-auto">Add to Wishlist</button>
        </div>

        {/* Delivery & Services */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold">Delivery & Services</h3>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="input input-bordered w-24"
            />
            <button className="text-blue-500 underline">Change</button>
          </div>
          <p className="text-gray-600 mt-2">🚚 Home Delivery by <span className="text-green-600 font-medium">Tomorrow</span></p>
          <p className="text-gray-600">🏬 Free Store Pickup Available</p>
          <p className="text-gray-700 mt-2">✅ 2 Year Warranty</p>
        </div>
      </div>

      {/* Specifications */}
      <div className="md:col-span-2 mt-8">
        <h3 className="text-lg font-semibold">Product Details</h3>
        <p className="text-gray-600">{product.description}</p>

        <h3 className="text-lg font-semibold mt-4">Technical Information</h3>
        <p className="text-gray-600">• {product.specifications || "Standard Size, Lightweight, Durable"}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
