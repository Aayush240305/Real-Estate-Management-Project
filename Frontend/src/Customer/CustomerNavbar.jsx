import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CustomerNavbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/v1/user/getUser", {
          withCredentials: true,
        });
        setName(res.data.data.fullName);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/user/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">

        <div className="flex items-center gap-4">
          <img src="/src/Images/Logo.png" alt="HomeSphere Logo" className="h-32 object-contain" />
        </div>

        <div className="flex items-center gap-6 text-gray-900 text-sm font-normal">
          <Link
            to="/customer/home"
            className="hover:text-indigo-600"
          >
            Properties
          </Link>

          <Link
            to="/customer/enquiries"
            className="hover:text-indigo-600"
          >
            My Enquiries
          </Link>

          <Link
            to="/customer/contact"
            className="hover:text-indigo-600"
          >
            Contact Us
          </Link>
          <Link
            to="/customer/review"
            className="hover:text-indigo-600"
          >
            Review
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-600">
            Hi, <span className="font-semibold">{name}</span>
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="pt-16"></div>
    </>
  );
}

export default CustomerNavbar;
