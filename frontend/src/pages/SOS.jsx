import { useState } from "react";

export default function SOS({ navigate }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendSOS = () => {
    setLoading(true);
    setStatus("");

    if (!navigator.geolocation) {
      setStatus("Location not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch("http://localhost:4000/send-sos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "Nithya",
              lat: latitude,
              lng: longitude,
            }),
          });

          const data = await res.json();
          setStatus(data.message || "SOS sent");
        } catch (err) {
          setStatus("Failed to send SOS");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setStatus("Location access denied.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] p-6 text-white flex flex-col items-center">

      {/* Back Button */}
      <div className="w-full">
        <button
          onClick={() => navigate("map")}
          className="text-xl text-white/70 mb-4"
        >
          ←
        </button>
      </div>

      {/* Title */}
      <h1 className="text-center text-3xl font-semibold mb-10">
        SOS Alert
      </h1>

      {/* 🔥 BIG MAROON SOS BUTTON */}
      <button
        onClick={sendSOS}
        disabled={loading}
        className="
          w-48 h-48
          rounded-full
          flex items-center justify-center
          text-4xl font-bold
          bg-[#8b0000]
          text-white
          shadow-[0_0_40px_#ff4444aa,0_0_15px_#8b0000aa]
          border-[6px] border-[#ffb3b3]
          active:scale-95
          transition-all duration-200
          mb-10
        "
      >
        {loading ? "..." : "SOS"}
      </button>

      {/* Secondary Buttons */}
      <button className="w-full py-4 rounded-xl bg-[#0e2725] text-[#0fe9d2] shadow-[0_0_15px_#0fe9d240] mb-3">
        Call Emergency Services
      </button>

      <button className="w-full py-4 rounded-xl bg-[#0e2725] text-[#0fe9d2] shadow-[0_0_15px_#0fe9d240] mb-3">
        Nearby Safe Places
      </button>

      {/* Status Message */}
      {status && (
        <div className="mt-4 text-center text-[#0fe9d2] text-sm">
          {status}
        </div>
      )}
    </div>
  );
}
