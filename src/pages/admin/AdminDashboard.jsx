import React from "react";
import { Link } from "react-router-dom";

// Dummy images (replace with actual paths or imports)
const productImage = "https://via.placeholder.com/40";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Products", path: "/admin/add-product" }, // updated
  { name: "Category", path: "#" },
  { name: "Orders", path: "#" },
  { name: "Transaction", path: "#" },
  { name: "Manage Admins", path: "#" },
  { name: "Customers", path: "#" },
  { name: "Settings", path: "#" },
  { name: "Help", path: "#" },
  { name: "Logout", path: "#" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8f7f4]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-4 font-semibold text-xs text-gray-400">MENU</div>
        <nav className="px-4 space-y-1 text-sm">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                index === 0 ? "bg-gray-100 font-semibold text-red-500" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Todays Sales"
            value="₹100,999"
            note="We have sold 123 items"
            color="blue"
          />
          <StatCard
            title="Todays Revenue"
            value="₹30,000"
            note="Profit made so today so far"
            color="green"
          />
          <StatCard
            title="Users Count"
            value="20390"
            note="Total users signed up"
            color="orange"
          />
        </div>

        {/* Selling Products Table */}
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Selling Products</h2>
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-filter"></i>
              </button>
              <select className="text-sm border rounded px-2 py-1">
                <option>8 Jul - 24 Jul</option>
              </select>
            </div>
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
              {[
                {
                  name: "Marvel Thor Movie Print Marble T...",
                  price: "₹2333",
                  sold: "53 pcs",
                  status: "In Stock",
                  img: productImage,
                },
                {
                  name: "Aero Shorts Pants Multipacks S...",
                  price: "₹2333",
                  sold: "53 pcs",
                  status: "Out of Stock",
                  img: productImage,
                },
                {
                  name: "Erigo T-Shirts Green",
                  price: "₹2322",
                  sold: "53 pcs",
                  status: "In Stock",
                  img: productImage,
                },
              ].map((product, idx) => (
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
