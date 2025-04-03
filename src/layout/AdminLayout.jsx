import React, { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader"; // Create this file
import Footer from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/user/Header"; // Default user header

function AdminLayout() {
  const [isAdminAuth, setIsAdminAuth] = useState(true);

  return (
    <>
      {isAdminAuth ? <AdminHeader /> : <Header />}
      <div className="min-h-screen p-4 bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default AdminLayout;
