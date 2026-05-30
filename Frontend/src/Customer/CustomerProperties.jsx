import React, { useEffect, useState } from "react";
import CustomerNavbar from "./CustomerNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerProperties() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [purpose, setPurpose] = useState("");
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/v1/property/all", {
          withCredentials: true,
        });
        setProperties(res.data.data || []);
        setFiltered(res.data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    let data = [...properties];

    if (purpose) {
      data = data.filter(p => p.purpose === purpose);
    }

    if (city) {
      data = data.filter(p =>
        p.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (maxPrice) {
      data = data.filter(p => Number(p.price) <= Number(maxPrice));
    }

    setFiltered(data);
  }, [purpose, city, maxPrice, properties]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <CustomerNavbar />

      <div className="mt-20 flex-1 overflow-y-auto p-8">

        <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-lg p-8 mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Find Your Perfect Property
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Buy / Rent
              </label>
              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              >
                <option value="">Any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Search city"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Max Budget (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000000"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <button
              onClick={() => {
                setPurpose("");
                setCity("");
                setMaxPrice("");
              }}
              className="h-[52px] rounded-2xl bg-gray-900 text-white hover:bg-black transition-all duration-300 shadow-md"
            >
              Clear Filters
            </button>

          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-lg text-gray-600">
              Loading properties...
            </div>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="bg-white p-12 rounded-3xl shadow-md text-center border border-gray-200">
            <p className="text-gray-600 text-lg">
              No properties match your search.
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(property => (
              <div
                key={property._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/400x250"
                    }
                    alt="property"
                    className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full capitalize shadow">
                    {property.purpose}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {property.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {property.city}
                  </p>

                  <p className="text-lg font-bold text-indigo-600 mt-3">
                    ₹{property.price}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 capitalize">
                    {property.type}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/customer/property/${property._id}`)
                    }
                    className="mt-6 w-full px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md"
                  >
                    View Details
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

export default CustomerProperties;