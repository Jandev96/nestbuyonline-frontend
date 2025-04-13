import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Add Products", path: "/admin/add-product" },
  { name: "Edit Products", path: "/admin/edit-products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Transaction", path: "#" },
  { name: "Manage Admins", path: "#" },
  { name: "Customers", path: "#" },
  { name: "Settings", path: "#" },
  { name: "Help", path: "#" },
  { name: "Logout", path: "#" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r shadow-sm fixed h-screen top-0 left-0 pt-20">
      <div className="p-4 font-semibold text-xs text-gray-400">MENU</div>
      <nav className="px-4 space-y-1 text-sm">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
              location.pathname === item.path
                ? "bg-gray-100 font-semibold text-red-500"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
