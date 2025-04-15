import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data.data);
        setForm({
          username: response.data.data.username || "",
          email: response.data.data.email || "",
          address: response.data.data.address || "",
          password: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (err) {
        setError("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/user/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword && form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const payload = {
        username: form.username,
        email: form.email,
        address: form.address,
        password: form.newPassword || form.password,
      };

      const response = await axiosInstance.put("/user/update", payload);
      setSuccess(response.data.message);
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (error && !user) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-20">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white rounded-md shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Manage My Account</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="text-red-500 font-medium">My Profile</li>
            <li className="hover:text-red-500 cursor-pointer">Address Book</li>
            <li className="hover:text-red-500 cursor-pointer">My Payment Options</li>
          </ul>

          <h3 className="font-semibold text-lg mt-6 mb-4">My Orders</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="hover:text-red-500 cursor-pointer">My Returns</li>
            <li className="hover:text-red-500 cursor-pointer">My Cancellations</li>
          </ul>

          <h3 className="font-semibold text-lg mt-6 mb-4">My Wishlist</h3>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-md shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-red-500">Edit Your Profile</h2>
            <p className="text-sm text-gray-500">
              Welcome! <span className="text-red-500">{user.username}</span>
            </p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full input input-bordered"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full input input-bordered"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full input input-bordered"
                required
              />
            </div>

            {/* Password Section */}
            <div className="col-span-2 text-sm text-gray-700 mt-2">Password</div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Current Password"
                value={form.password}
                onChange={handleChange}
                className="w-full input input-bordered"
                required
              />
            </div>
            <div>
              <input
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full input input-bordered"
              />
            </div>
            <div className="col-span-2">
              <input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChange={handleChange}
                className="w-full input input-bordered"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={handleLogout} className="btn btn-outline btn-error">
              Logout
            </button>
            <button type="submit" className="btn btn-error text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
