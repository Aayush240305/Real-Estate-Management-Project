import React, { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import axios from "axios";
import {User, Mail, Phone} from 'lucide-react';

function CustomerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(
          "/api/v1/enquiry/customer",
          { withCredentials: true }
        );
        setEnquiries(res.data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const statusBadge = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <CustomerNavbar />

      <div className="mt-20 flex-1 overflow-y-auto p-10">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            My Enquiries
          </h2>

          {loading && (
            <div className="flex justify-center items-center h-32">
              <div className="animate-pulse text-lg text-gray-600">
                Loading enquiries...
              </div>
            </div>
          )}

          {!loading && enquiries.length === 0 && (
            <div className="bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-lg text-center border border-gray-200">
              <p className="text-gray-600 text-lg">
                You have not sent any enquiries yet.
              </p>
            </div>
          )}

          {!loading && enquiries.length > 0 && (
            <div className="space-y-8">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="bg-white/90 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 border border-gray-200"
                >
                  <div className="relative">
                    <img
                      src={
                        enquiry.property?.images?.[0] ||
                        "https://via.placeholder.com/200x150"
                      }
                      alt="property"
                      className="w-full md:w-56 h-40 object-cover rounded-2xl"
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
                      <h3 className="text-xl font-semibold text-gray-800">
                        {enquiry.property?.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        {enquiry.property?.city}
                      </p>

                      <p className="text-lg font-bold text-indigo-600 mt-3">
                        ₹{enquiry.property?.price}
                      </p>

                      <p className="text-xs text-gray-400 mt-1 capitalize">
                        {enquiry.property?.purpose} • {enquiry.property?.type}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">

                      {enquiry.status === "approved" && enquiry.owner && (
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl">
                          <span className="font-medium">
                            Owner:
                          </span>{" "}
                          <User className="inline-block" size={16} /> {enquiry.owner.fullName} • <Mail className="inline-block" size={16} /> {enquiry.owner.email} • <Phone className="inline-block" size={16} /> {enquiry.owner.phone}
                        </div>
                      )}

                      {enquiry.status === "pending" && (
                        <span className="text-gray-500 bg-yellow-50 px-4 py-2 rounded-xl">
                          Waiting for owner response
                        </span>
                      )}

                      {enquiry.status === "rejected" && (
                        <span className="text-gray-500 bg-red-50 px-4 py-2 rounded-xl">
                          Enquiry was denied by owner
                        </span>
                      )}

                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default CustomerEnquiries;