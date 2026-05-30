import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function PropertyManagement() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axios.get(
        "/api/v1/admin/properties",
        { withCredentials: true }
      );
      setProperties(res.data.data);
    };

    fetchProperties();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `/api/v1/admin/property/status/${id}`,
      { status },
      { withCredentials: true }
    );

    setProperties(prev =>
      prev.map(p =>
        p._id === id ? { ...p, status } : p
      )
    );
  };

  const statusBadge = (status) => {
    if (status === "approved")
      return "bg-green-50 text-green-600";
    if (status === "rejected")
      return "bg-red-50 text-red-600";
    return "bg-yellow-50 text-yellow-600";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSidebar title="Property Approval" />

      <div className="mt-20 flex-1 overflow-y-auto p-10 space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Property Review
          </h1>
          <p className="text-gray-500 mt-2">
            Approve or reject submitted properties
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left p-5">Title</th>
                <th className="text-left p-5">Owner</th>
                <th className="text-left p-5">City</th>
                <th className="text-left p-5">Purpose</th>
                <th className="text-left p-5">Status</th>
                <th className="text-left p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {properties.map(property => (
                <tr
                  key={property._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-5 font-medium text-gray-800">
                    {property.title}
                  </td>

                  <td className="p-5 text-gray-600">
                    {property.owner?.fullName}
                  </td>

                  <td className="p-5 text-gray-600">
                    {property.city}
                  </td>

                  <td className="p-5 capitalize">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
                      {property.purpose}
                    </span>
                  </td>

                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusBadge(property.status)}`}>
                      {property.status}
                    </span>
                  </td>

                  <td className="p-5 space-x-3">

                    {property.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(property._id, "approved")}
                          className="px-4 py-2 rounded-xl text-white text-xs font-medium bg-green-600 hover:bg-green-700 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(property._id, "rejected")}
                          className="px-4 py-2 rounded-xl text-white text-xs font-medium bg-red-600 hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}

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

export default PropertyManagement;