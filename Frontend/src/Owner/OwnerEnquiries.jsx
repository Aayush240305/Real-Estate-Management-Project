import React, { useEffect, useState } from "react";
import OwnerSideBar from "./OwnerSideBar";
import axios from "axios";
import { toast } from "react-toastify";
import {Phone, Mail, User} from 'lucide-react';

function OwnerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(
          "/api/v1/enquiry/owner",
          { withCredentials: true }
        );
        setEnquiries(res.data.data || []);
      } catch {
        console.log("Failed to fetch enquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await axios.put(
        `/api/v1/enquiry/status/${id}`,
        { status },
        { withCredentials: true }
      );

      setEnquiries(prev =>
        prev.map(e =>
          e._id === id ? { ...e, status } : e
        )
      );

      toast.success(`Enquiry ${status}`);
    } catch {
      toast.error("Failed to update enquiry");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = status => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OwnerSideBar title="Enquiries" />

      <div className="mt-20 flex-1 overflow-y-auto p-10">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Property Enquiries
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-lg text-gray-600">
              Loading enquiries...
            </div>
          </div>
        )}

        {!loading && enquiries.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              No enquiries received yet.
            </p>
          </div>
        )}

        {!loading && enquiries.length > 0 && (
          <div className="space-y-8">

            {enquiries.map(enquiry => (
              <div
                key={enquiry._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col lg:flex-row gap-6"
              >
                <div className="relative">
                  <img
                    src={
                      enquiry.property?.images?.[0] ||
                      "https://via.placeholder.com/200x150"
                    }
                    alt="property"
                    className="w-full lg:w-56 h-36 object-cover rounded-xl"
                  />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize shadow ${statusBadge(
                      enquiry.status
                    )}`}
                  >
                    {enquiry.status}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {enquiry.property?.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {enquiry.property?.city}
                    </p>

                    <p className="text-lg font-bold text-indigo-600 mt-3">
                      ₹{enquiry.property?.price}
                    </p>

                    <p className="text-xs text-gray-400 mt-1 capitalize">
                      {enquiry.property?.purpose} • {enquiry.property?.type}
                    </p>
                  </div>

                  <div className="mt-6 text-sm text-gray-600">
                    <span className="font-medium text-gray-700">
                      Customer:
                    </span>{" "}
                    <User className="inline-block" size={16} /> {enquiry.customer?.fullName} • <Mail className="inline-block" size={16} /> {enquiry.customer?.email} • <Phone className="inline-block" size={16} /> {enquiry.customer?.phone}
                  </div>

                </div>

                {enquiry.status === "pending" && (
                  <div className="flex gap-4 self-start lg:self-center">
                    <button
                      disabled={updatingId === enquiry._id}
                      onClick={() =>
                        updateStatus(enquiry._id, "approved")
                      }
                      className="px-5 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {updatingId === enquiry._id ? "Processing..." : "Approve"}
                    </button>

                    <button
                      disabled={updatingId === enquiry._id}
                      onClick={() =>
                        updateStatus(enquiry._id, "rejected")
                      }
                      className="px-5 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {updatingId === enquiry._id ? "Processing..." : "Reject"}
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default OwnerEnquiries;