import React from "react";


export default function AdminDashboard() {
  return (

    <>
    <adminNav />
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, Admin! Manage your store from here.</p>
      </div>
    </div>
    </>
  );
}
