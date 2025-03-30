import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/signup", data, { withCredentials: true });
      alert(response.data.message);
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>

        {/* Username Input */}
        <label className="label">Username</label>
        <input type="text" className="input input-bordered w-full" placeholder="Username" {...register("username", { required: "Username is required" })} />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        {/* Email Input */}
        <label className="label mt-2">Email</label>
        <input type="email" className="input input-bordered w-full" placeholder="Email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Password Input */}
        <label className="label mt-2">Password</label>
        <input type="password" className="input input-bordered w-full" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* Confirm Password Input */}
        <label className="label mt-2">Confirm Password</label>
        <input type="password" className="input input-bordered w-full" placeholder="Confirm Password" {...register("confirmPassword", { required: "Confirm Password is required", validate: value => value === watch("password") || "Passwords do not match" })} />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        {/* Address Input */}
        <label className="label mt-2">Address</label>
        <input type="text" className="input input-bordered w-full" placeholder="Address" {...register("address", { required: "Address is required" })} />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

     
        

        {/* Submit Button */}
        <button type="submit" className="btn btn-neutral mt-4 w-full">Sign Up</button>
      </div>
    </form>
  );
}
