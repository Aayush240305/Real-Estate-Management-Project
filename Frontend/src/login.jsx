import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );

      const role = res.data.data.loggedUser.role;
      toast.success("Login successful");

      if (role === "owner") {
        navigate("/owner/dashboard", { replace: true });
      } else if (role === "customer") {
        navigate("/customer/home", { replace: true });
      } else if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      const status = err?.response?.status;

      if (status === 401) {
        toast.error("Password is incorrect");
      } else if (status === 404) {
        toast.error("User not found");
        navigate("/signup");
      } else if (status === 403) {
        toast.error("Your account has been blocked.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Login to your Homesphere account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}