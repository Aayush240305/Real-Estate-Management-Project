import React, { useEffect, useState } from "react";
import OwnerSideBar from "./OwnerSideBar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get("/api/v1/property/myproperties", {
          withCredentials: true,
        });

        const property = res.data.data.find(p => p._id === id);

        if (!property) {
          toast.error("Property not found");
          navigate("/owner/myproperties");
          return;
        }

        setFormData({
          title: property.title || "",
          purpose: property.purpose || "",
          type: property.type || "",
          price: property.price || "",
          city: property.city || "",
          address: property.address || "",
          bedrooms: property.bedrooms || "",
          bathrooms: property.bathrooms || "",
          area: property.area || "",
          description: property.description || "",
          images: [],
        });

        setExistingImages(property.images || []);
      } catch {
        toast.error("Failed to load property");
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
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

      await axios.put(`/api/v1/property/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Property updated successfully");
      navigate("/owner/myproperties");
    } catch {
      toast.error("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <OwnerSideBar title="Edit Property" />

      <div className="mt-20 flex-1 overflow-y-auto p-10">
        <div className="max-w-6xl bg-white rounded-2xl shadow-md p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Edit Property
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
              <label className="text-sm font-medium text-gray-600">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
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

            {existingImages.length > 0 && (
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Existing Images
                </p>
                <div className="flex gap-4 flex-wrap">
                  {existingImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="existing"
                      className="w-28 h-20 object-cover rounded-xl shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Add New Images (optional)
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
                <p className="mt-3 text-sm text-gray-600">
                  {formData.images.length} new image(s) selected
                </p>
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
                {loading ? "Updating..." : "Update Property"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;