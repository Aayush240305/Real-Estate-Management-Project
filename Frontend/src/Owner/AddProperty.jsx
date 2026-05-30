import React, { useState } from "react";
import OwnerSideBar from "./OwnerSideBar";
import axios from "axios";
import { toast } from "react-toastify";
import MapPicker from "../MapPicker";

function AddProperty() {

  const [location, setLocation] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    type: "",
    price: "",
    city: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((img) => {
            data.append("images", img);
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      if (location) {
        data.append("latitude", location.lat);
        data.append("longitude", location.lng);
      }

      await axios.post("/api/v1/property/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Property added successfully");

      setFormData({
        title: "",
        purpose: "",
        type: "",
        price: "",
        city: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        description: "",
        images: [],
      });

      setLocation(null);
    } catch {
      toast.error("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OwnerSideBar title="Add Property" />

      <div className="mt-20 flex-1 overflow-y-auto p-10">
        <div className="max-w-6xl bg-white rounded-2xl shadow-md p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Add New Property
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <label className="text-sm font-medium text-gray-600">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              >
                <option value="">Select</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              >
                <option value="">Select type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>
              </select>
            </div>

            {formData.purpose && (
              <div>
                <label className="text-sm font-medium text-gray-600">
                  {formData.purpose === "buy" ? "Price (₹)" : "Monthly Rent (₹)"}
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Area (sqft)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Select Location on Map
              </label>
              <div className="mt-2">
                <MapPicker location={location} setLocation={setLocation} />
                {location && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Property Images
              </label>

              <label className="mt-3 w-full flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <span className="text-gray-600 text-sm">
                  Click to upload images
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {formData.images.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  {formData.images.length} image(s) selected
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-2xl text-white font-semibold transition-all duration-300 shadow-md ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
                }`}
              >
                {loading ? "Saving..." : "Save Property"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;