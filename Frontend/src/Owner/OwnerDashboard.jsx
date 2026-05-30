import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerSideBar from "./OwnerSideBar";

function OwnerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/v1/property/dashboard", {
          withCredentials: true,
        });
        setStats(res.data.data);
      } catch {
        console.error("Dashboard fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <OwnerSideBar title="Dashboard" />
        <div className="mt-20 flex-1 flex items-center justify-center">
          <div className="animate-pulse text-lg text-gray-600">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OwnerSideBar title="Dashboard" />

      <div className="mt-20 flex-1 overflow-y-auto p-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <p className="text-sm text-gray-500">Total Properties</p>
            <h2 className="text-4xl font-bold text-indigo-600 mt-3">
              {stats.totalProperties}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <p className="text-sm text-gray-500">Properties for Buy</p>
            <h2 className="text-4xl font-bold text-green-600 mt-3">
              {stats.buyCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
            <p className="text-sm text-gray-500">Properties for Rent</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-3">
              {stats.rentCount}
            </h2>
          </div>

        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Properties
          </h3>

          {stats.recentProperties.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No properties added yet.
            </p>
          ) : (
            <div className="space-y-6">
              {stats.recentProperties.map((property) => (
                <div
                  key={property._id}
                  className="flex items-center gap-6 border-b pb-6 last:border-none"
                >
                  <img
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/100x70"
                    }
                    alt="property"
                    className="w-24 h-16 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-800">
                      {property.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {property.city} • {property.purpose.toUpperCase()}
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-gray-700">
                    ₹{property.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default OwnerDashboard;