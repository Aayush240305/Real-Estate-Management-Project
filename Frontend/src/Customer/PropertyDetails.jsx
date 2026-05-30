import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "./CustomerNavbar";
import { toast } from "react-toastify";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function PropertyDetails() {

  const mapcontainer = {
    width: "100%",
    height: "350px"
  };

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [center, setCenter] = useState({ lat: 18.5204, lng: 73.8567 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/v1/property/details/${id}`, {
          withCredentials: true
        });

        setProperty(res.data.data);
        setActiveImage(res.data.data.images?.[0]);

        if (res.data.data.location?.lat && res.data.data.location?.lng) {
          setCenter({
            lat: Number(res.data.data.location.lat),
            lng: Number(res.data.data.location.lng)
          });
        }

      } catch {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSendEnquiry = async () => {
    try {
      await axios.post(
        `/api/v1/enquiry/send`,
        { propertyId: id, message: "I am interested in this property." },
        { withCredentials: true }
      );
      toast.success("Enquiry sent successfully");
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error("You have already sent an enquiry for this property");
      } else {
        toast.error("Failed to send enquiry");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center">
        Property not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <CustomerNavbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 mt-4">

        <div className="grid lg:grid-cols-2 gap-14">

          <div>

            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={activeImage || "https://via.placeholder.com/600x400"}
                alt="property"
                className="w-full h-full object-cover"
              />

              <span className="absolute top-5 left-5 bg-indigo-600 text-white text-xs px-4 py-1 rounded-full shadow capitalize">
                {property.purpose}
              </span>

            </div>

            {property.images?.length > 1 && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-1">
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-28 object-cover rounded-lg cursor-pointer ${
                      activeImage === img
                        ? "ring-2 ring-indigo-600"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}

          </div>

          <div className="space-y-7">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                {property.title}
              </h1>

              <p className="text-gray-500 mt-1 text-lg">
                {property.city}
              </p>

              <p className="text-4xl font-bold text-indigo-600 mt-4">
                ₹ {property.price}
              </p>

            </div>

            <div className="grid grid-cols-2 gap-5 text-sm">

              <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-2">
                🏠 <span>{property.type}</span>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-2">
                🛏 <span>{property.bedrooms || "-"} Bedrooms</span>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-2">
                🚿 <span>{property.bathrooms || "-"} Bathrooms</span>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-2">
                📐 <span>{property.area || "-"} sqft</span>
              </div>

            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Address
              </h3>
              <p className="text-gray-600">
                {property.address}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {property.description || "No description available"}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-14 bg-white rounded-xl p-6 shadow-sm border">

          <h3 className="font-semibold text-gray-800 mb-4">
            Property Location
          </h3>

          {!isLoaded ? (
            <p>Loading Map...</p>
          ) : (
            <GoogleMap
              mapContainerStyle={mapcontainer}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          )}

        </div>

        <button
          onClick={handleSendEnquiry}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg mt-6"
        >
          Send Enquiry
        </button>

      </div>

    </div>
  );
}

export default PropertyDetails;