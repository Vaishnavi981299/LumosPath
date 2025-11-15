import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function MapHome({ navigate }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setPosition([17.385, 78.486]); // fallback
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-screen relative bg-[#0b0b0b]">

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-[500] p-4 flex items-center bg-[#1a1a1a] text-white">
        <span className="text-lg">📍 LumosPath</span>
        <div className="ml-auto text-xl">⚙️</div>
      </div>

      {/* REAL MAP */}
      {position && (
        <MapContainer
          center={position}
          zoom={16}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />

          <Marker position={position} icon={userIcon}>
            <Popup>You Are Here</Popup>
          </Marker>
        </MapContainer>
      )}

      {/* 🚨 SOS */}
      <button
        onClick={() => navigate("sos")}
        className="
          absolute top-20 right-4 z-[1000]
          w-16 h-16 rounded-full bg-[#8b0000]
          text-white text-3xl flex items-center justify-center
          shadow-[0_0_25px_#ff1a1a] border-[4px] border-[#ffb3b3]
          animate-pulse
        "
      >
        🚨
      </button>

      {/* Bottom Menu */}
      <div className="absolute bottom-0 left-0 right-0 z-[500] p-4 bg-[#0b0b0b] flex gap-3 shadow-[0_-5px_20px_#000]">
        <button
          onClick={() => navigate("compare")}
          className="flex-1 py-3 rounded-xl bg-[#0e2725] text-[#0fe9d2]"
        >
          Routes
        </button>

        <button
          onClick={() => navigate("map")}
          className="flex-1 py-3 rounded-xl bg-[#0e2725] text-[#0fe9d2]"
        >
          Find Safe Route
        </button>

        <button
          onClick={() => navigate("report")}
          className="flex-1 py-3 rounded-xl bg-[#0e2725] text-[#0fe9d2]"
        >
          Safety Metrics
        </button>
      </div>
    </div>
  );
}
