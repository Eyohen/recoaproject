/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ location }) => {
  const [position, setPosition] = useState(null);
  const zoom = 13;

  const fetchCoordinates = async (location) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setPosition([lat, lon]);
    } else {
        console.log("No coordinates found for location: ", location);
        setPosition(["6.4550575", "3.3941795"]);
    }
  };

  useEffect(() => {
    fetchCoordinates(location);
  }, [location]);

  if (!position) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {location} <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
