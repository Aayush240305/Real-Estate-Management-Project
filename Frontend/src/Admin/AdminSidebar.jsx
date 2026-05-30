import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AdminSideBar({ title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "/api/v1/user/getUser",
          { withCredentials: true }
        );
        setName(res.data.data.fullName);
      } catch (error) {
        toast.error("Failed to load user information");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLink = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src="/src/Images/Logo.png"
            alt="logo"
            className="h-32 object-contain"
          />
        </div>

        <div className="text-lg font-semibold text-gray-800">{title}</div>

        <div className="text-gray-600 text-sm">
          Welcome, <span className="font-semibold text-gray-800">{name}</span>
        </div>
      </div>

      <div className="flex pt-20 h-screen bg-gray-50">

        <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">

          <div className="flex flex-col gap-2 px-4 py-8 flex-1">

            <Link to="/admin/dashboard" className={navLink("/admin/dashboard")}>
              📊 <span>Dashboard</span>
            </Link>

            <Link to="/admin/user" className={navLink("/admin/user")}>
              👤 <span>User Management</span>
            </Link>

            <Link to="/admin/property" className={navLink("/admin/property")}>
              🏠 <span>Property Management</span>
            </Link>

            <Link to="/admin/enquiries" className={navLink("/admin/enquiries")}>
              📩 <span>Enquiries</span>
            </Link>

            <Link to="/admin/reviews" className={navLink("/admin/reviews")}>
              ⭐ <span>Reviews</span>
            </Link>

            <Link to="/admin/contacts" className={navLink("/admin/contacts")}>
              💬 <span>Customer Queries</span>
            </Link>

          </div>

          <div className="px-4 pb-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              🚪 <span>Logout</span>
            </button>
          </div>

        </div>

      </div>
    </>
  );
}

export default AdminSideBar;