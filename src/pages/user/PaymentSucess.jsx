import React from "react";
import { CheckCircle2 } from "lucide-react"; // You can also use a custom SVG
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md text-center animate-fade-in">
        <CheckCircle2 className="text-green-500 w-20 h-20 mx-auto animate-ping-once" />
        <h1 className="text-3xl font-bold text-green-600 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order is being processed.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
