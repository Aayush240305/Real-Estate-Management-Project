import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Eye,EyeOff } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/v1/user/register", {
        fullName,
        email,
        password,
        phone,
        role,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error("User already exists");
        navigate("/login");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">

      <div className="w-full max-w-sm backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Join Homesphere
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Create your account in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              required
              maxLength={15}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-500 text-xs"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
          >
            <option value="customer">Register as Buyer</option>
            <option value="owner">Register as property owner</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white text-sm font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-xs text-gray-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}