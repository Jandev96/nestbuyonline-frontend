import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";


export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        navigate("/"); // Redirect to home after login
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

        {/* Email Input */}
        <label className="label">Email</label>
        <input type="email" className="input input-bordered w-full" placeholder="Email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Password Input */}
        <label className="label mt-2">Password</label>
        <input type="password" className="input input-bordered w-full" placeholder="Password" {...register("password", { required: "Password is required" })} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* Show Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="btn btn-neutral mt-4 w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </form>
  );
}
