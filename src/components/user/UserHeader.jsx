import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import DarkMode from "../../pages/shared/DarkMode";
import { useCartStore } from "../../zustand/cartStore";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useCartStore((state) => state.totalQuantity()) || 0;
  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      clearCart();
      navigate("/login");
    });
  };

  return (
    <div className="navbar fixed top-0 left-0 z-50 w-full px-6 py-3 bg-opacity-80 backdrop-blur-lg shadow-lg 
                    border-b border-gray-700 bg-gray-900/80 text-white transition-all">
      {/* Left Side (Logo) */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold tracking-wide neon-text">MyShop</Link>
      </div>

      {/* Dark Mode Toggle */}
      <DarkMode />

      {/* Cart Icon */}
      <div className="flex-none mx-4">
        <Link to="/cart" className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white transition-transform hover:scale-110"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full 
                              bg-red-600 text-xs font-bold text-white shadow-lg">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>

      {/* User Authentication */}
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-105 transition">
              <div className="w-10 rounded-full border-2 border-blue-500 shadow-lg">
                <img alt="Profile" src={user.profilePic || "https://via.placeholder.com/40"} />
              </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 p-2 rounded-lg bg-gray-900/90 
                                        text-white shadow-lg border border-gray-700">
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm neon-border">Login</Link>
            <Link to="/signup" className="btn btn-primary btn-sm neon-button">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
