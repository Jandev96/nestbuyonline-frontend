import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import DarkMode from "../../pages/shared/DarkMode";
import { useCartStore } from "../../zustand/cartStore";

function UserHeader() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useCartStore((state) => state.totalQuantity()) || 0;
  const clearCart = useCartStore((state) => state.clearCart);

  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      clearCart();
      navigate("/login");
    });
  };

  return (
    <>
      <div
        className={`navbar fixed top-0 left-0 z-50 w-full px-6 py-3 bg-opacity-80 backdrop-blur-lg shadow-lg 
        border-b border-gray-700 bg-gray-900/80 text-white transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold tracking-wide neon-text">
            MyShop
          </Link>
        </div>

        {/* Dark Mode */}
        <DarkMode />

        {/* Cart Icon (Visible on all screen sizes) */}
        <div className="flex-none mx-4">
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white transition-transform hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full 
                bg-red-600 text-xs font-bold text-white shadow-lg">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Navigation & Auth */}
        <div className="hidden lg:flex items-center gap-6 ml-6">
          <nav className="flex gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-blue-400 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </nav>

          

          {user ? (
            <div className="dropdown dropdown-end ml-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition"
              >
                <div className="w-10 rounded-full border-2 border-blue-500 shadow-lg">
                  <img
                    alt="Profile"
                    src={user.profilePic || "https://via.placeholder.com/40"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 p-2 rounded-lg bg-gray-900/90 
                text-white shadow-lg border border-gray-700"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2 ml-4">
              <Link to="/login" className="btn btn-outline btn-sm neon-border">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm neon-button">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-[64px] w-full bg-gray-900 text-white shadow-md border-t border-gray-700 z-40 fixed top-0 pt-16">
          <nav className="flex flex-col items-center py-4 space-y-2">
            <Link to="/" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/about" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>Contact</Link>

            {user ? (
              <>
                <Link to="/profile" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="py-2 px-4 text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="py-2 px-4 hover:bg-gray-700 rounded" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

export default UserHeader;
