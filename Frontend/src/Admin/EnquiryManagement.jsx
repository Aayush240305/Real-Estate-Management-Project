import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchEnquiries = async () => {
      const res = await axios.get(
        "/api/v1/admin/enquiries",
        { withCredentials: true }
      );
      setEnquiries(res.data.data);
    };

    fetchEnquiries();
  }, []);

  const filtered = enquiries.filter(e =>
    statusFilter ? e.status === statusFilter : true
  );

  const statusBadge = (status) => {
    if (status === "approved")
      return "bg-green-50 text-green-600";
    if (status === "rejected")
      return "bg-red-50 text-red-600";
    return "bg-yellow-50 text-yellow-600";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar title="Enquiry Management" />

      <div className="mt-20 flex-1 overflow-y-auto p-10 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            All Enquiries
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor customer interactions across the platform
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-72">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left p-5">Property</th>
                <th className="text-left p-5">Customer</th>
                <th className="text-left p-5">Owner</th>
                <th className="text-left p-5">Status</th>
                <th className="text-left p-5">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((enquiry) => (
                <tr
                  key={enquiry._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-5">
                    <div className="font-medium text-gray-800">
                      {enquiry.property?.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {enquiry.property?.city}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="text-gray-800">
                      {enquiry.customer?.fullName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {enquiry.customer?.email}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="text-gray-800">
                      {enquiry.owner?.fullName}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {enquiry.owner?.email}
                    </div>
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusBadge(
                        enquiry.status
                      )}`}
                    >
                      {enquiry.status}
                    </span>
                  </td>

                  <td className="p-5 text-gray-500">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default EnquiryManagement;