import React, { useEffect, useState } from "react";
import { useOrderStore } from "../../zustand/orderStore";

const AdminOrders = () => {
  const {
    fetchAllOrders,
    updateOrderStatus, // ⬅️ make sure this is in your store
    orders,
    loading,
    error,
  } = useOrderStore();

  const [statusUpdates, setStatusUpdates] = useState({}); // track status changes per order

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleUpdateClick = (orderId) => {
    const status = statusUpdates[orderId];
    if (!status) return;
    updateOrderStatus(orderId, status);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3">{order.customerId?.username}</td>
                <td className="p-3">{order.customerId?.email}</td>
                <td className="p-3">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    value={statusUpdates[order._id] || order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3">${order.totalPrice.toFixed(2)}</td>
                <td className="p-3">
                  {order.products.map((p) => (
                    <div key={p.productId?._id} className="text-sm">
                      {p.productId?.name} × {p.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdateClick(order._id)}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
