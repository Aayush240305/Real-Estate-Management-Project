import React, { useEffect, useState } from "react";
import OwnerSideBar from "./OwnerSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/v1/property/myproperties", {
          withCredentials: true,
        });
        setProperties(res.data.data || []);
      } catch {
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/v1/property/delete/${id}`, {
        withCredentials: true,
      });

      setProperties((prev) =>
        prev.filter((property) => property._id !== id)
      );

      toast.success("Property deleted successfully");
    } catch {
      toast.error("Failed to delete property");
    }
  };

  const statusBadge = (status) => {
    if (status === "approved")
      return "bg-green-100 text-green-700";
    if (status === "rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OwnerSideBar title="My Properties" />

      <div className="mt-20 flex-1 overflow-y-auto p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          My Properties
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-lg text-gray-600">
              Loading properties...
            </div>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              You have not added any properties yet.
            </p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/400x250"
                    }
                    alt="property"
                    className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full capitalize font-semibold shadow ${statusBadge(
                      property.status
                    )}`}
                  >
                    {property.status}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {property.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {property.city}
                  </p>

                  <p className="text-xl font-bold text-indigo-600 mt-3">
                    ₹{property.price}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 capitalize">
                    {property.purpose}
                  </p>
                </div>

                <div className="flex border-t border-gray-200">
                  <button
                    onClick={() =>
                      navigate(`/owner/edit-property/${property._id}`)
                    }
                    className="flex-1 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(property._id)}
                    className="flex-1 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProperties;