import React, { useEffect } from "react";
import { useCartStore } from "../../zustand/cartStore";

function Cart() {
  const { items = [], totalAmount, fetchCart, increaseQuantity, decreaseQuantity, removeItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <h2 className="text-center text-3xl font-bold my-6">Your Cart</h2>

      {items.length > 0 ? (
        <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={item?.productId?._id || index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4">
                  {item?.productId?.images ? (
                    <img
                      className="w-16 h-16 rounded-lg object-cover"
                      src={item.productId.images}
                      alt={item?.productId?.name || "Product"}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      ❌ No Image
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold">{item?.productId?.name || "Unknown Product"}</p>
                    <p className="text-sm text-gray-500">${item?.price || 0} x {item?.quantity || 0}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => decreaseQuantity(item?.productId?._id)}
                    disabled={item?.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item?.quantity || 0}</span>
                  <button
                    className="btn btn-sm btn-outline btn-primary"
                    onClick={() => increaseQuantity(item?.productId?._id)}
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() => removeItem(item?.productId?._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* Total Price Section */}
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold">Total Price: ${totalAmount?.toFixed(2) || "0.00"}</h3>
            <button className="btn btn-lg btn-success mt-4">Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
      )}
    </>
  );
}

export default Cart;
