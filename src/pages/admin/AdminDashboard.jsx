import React, { useEffect } from "react";
import useProductStore from "../../zustand/productStore";
import { useOrderStore } from "../../zustand/orderStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const { products, fetchProducts } = useProductStore();
  const { orders, fetchAllOrders } = useOrderStore();

  useEffect(() => {
    fetchProducts();
    fetchAllOrders();
  }, []);

  const topProducts = products
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      price: `₹${p.price}`,
      sold: p.sold || Math.floor(Math.random() * 100), // Replace with real sold if available
      status: p.stock > 0 ? "In Stock" : "Out of Stock",
      img: p.images?.[0] || "https://via.placeholder.com/40",
    }));

  const revenueData = orders.map((order) => ({
    date: new Date(order.orderDate).toLocaleDateString(),
    total: order.totalPrice,
  }));

  return (
    <div className="mt-20 flex min-h-screen bg-[#f8f7f4]">
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Orders"
            value={orders.length}
            note="Orders placed till now"
            color="blue"
          />
          <StatCard
            title="Products Available"
            value={products.length}
            note="Total products in store"
            color="green"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${orders.reduce((acc, order) => acc + order.totalPrice, 0).toFixed(2)}`}
            note="Sum of all orders"
            color="orange"
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-gray-500">No revenue data to display.</p>
          )}
        </div>

        {/* Top Products Table */}
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Products</h2>
          </div>
          <table className="min-w-full text-sm">
            <thead className="text-left border-b text-gray-600">
              <tr>
                <th className="py-2">Product Name</th>
                <th>Price</th>
                <th>Sold</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.sold}</td>
                  <td>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, note, color }) {
  const colorMap = {
    blue: "text-blue-500",
    green: "text-green-500",
    orange: "text-orange-500",
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <h2 className="font-medium text-sm text-gray-600">{title}</h2>
      <div className={`text-xl font-bold ${colorMap[color]}`}>{value}</div>
      <p className="text-sm text-gray-400">{note}</p>
    </div>
  );
}
