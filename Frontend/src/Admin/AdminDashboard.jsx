import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar.jsx";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "/api/v1/admin/dashboard",
          { withCredentials: true }
        );
        setStats(res.data.data);
      } catch (error) {
        toast.error("Failed to load dashboard")
      }
    };
    fetchDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  const Card = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold mt-4 ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar title="Dashboard" />

      <div className="mt-20 flex-1 overflow-y-auto p-10 space-y-14">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Overview
          </h1>
          <p className="text-gray-500 mt-2">
            Platform performance and activity summary
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Users Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Card title="Total Users" value={stats.totalUsers} color="text-indigo-600" />
            <Card title="Total Owners" value={stats.totalOwners} color="text-blue-600" />
            <Card title="Total Customers" value={stats.totalCustomers} color="text-purple-600" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Properties Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Card title="Total Properties" value={stats.totalProperties} color="text-green-600" />
            <Card title="Approved Properties" value={stats.approvedProperties} color="text-emerald-600" />
            <Card title="Pending Properties" value={stats.pendingProperties} color="text-yellow-500" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Enquiries Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Card title="Total Enquiries" value={stats.totalEnquiries} color="text-orange-600" />
            <Card title="Approved Enquiries" value={stats.approvedEnquiries || 0} color="text-green-600" />
            <Card title="Pending Enquiries" value={stats.pendingEnquiries || 0} color="text-yellow-500" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;