import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function MapPicker({ location, setLocation }) {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const defaultCenter = {
    lat: 18.5204,
    lng: 73.8567
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setLocation({
      lat,
      lng
    });
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "350px" }}
      center={location || defaultCenter}
      zoom={13}
      onClick={handleMapClick}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
}

export default MapPicker;