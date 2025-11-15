import { useEffect, useState } from "react";

export default function SafetyReport({ navigate }) {
  const [data, setData] = useState(null);

  const MOCK_DATA = {
    route: {
      from: "Oak Street",
      to: "Maple Avenue",
    },
    crime: [5, 3, 4, 6, 2],
    crowd: { busy: 35, moderate: 40, low: 25 },
    lighting: { wellLit: 60, poorlyLit: 40 },
  };

  useEffect(() => {
    // Try backend — if fails, load mock data
    fetch("http://localhost:4000/safety")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => setData(MOCK_DATA));

    // Timeout fallback
    setTimeout(() => {
      if (!data) setData(MOCK_DATA);
    }, 1500);
  }, []);

  const d = data || MOCK_DATA;

  return (
    <div className="w-full min-h-screen bg-[#0b0b0b] text-white p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("compare")}
        className="text-xl text-white/70 mb-3"
      >
        ←
      </button>

      <h1 className="text-center text-2xl font-semibold mb-4">
        Safety Report
      </h1>

      {/* Route Overview */}
      <div className="bg-[#08302c] rounded-xl p-4 shadow-[0_0_18px_#0fe9d230] mb-4">
        <h2 className="font-semibold mb-2 text-lg">Route Overview</h2>
        <p className="text-gray-300 text-sm">From: {d.route.from}</p>
        <p className="text-gray-300 text-sm">To: {d.route.to}</p>
      </div>

      {/* Crime Hotspots */}
      <div className="bg-[#08302c] rounded-xl p-4 shadow-[0_0_18px_#0fe9d230] mb-4">
        <h2 className="font-semibold mb-2 text-lg">Crime Hotspots</h2>

        {d.crime.map((v, i) => (
          <div key={i} className="flex items-center mb-2 gap-3">
            <span className="text-gray-300 w-20 text-sm">Area {i + 1}</span>
            <div className="flex-1 h-3 bg-[#0b4942] rounded overflow-hidden">
              <div
                className="h-full bg-[#0fe9d2]"
                style={{ width: `${v * 15}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Crowd Levels */}
      <div className="bg-[#08302c] rounded-xl p-4 shadow-[0_0_18px_#0fe9d230] mb-4">
        <h2 className="font-semibold mb-2 text-lg">Crowd Levels</h2>
        <div className="flex gap-4">
          <div className="w-1/2 h-24 bg-[#0b4942] rounded flex items-center justify-center text-[#0fe9d2] text-sm">
            Busy: {d.crowd.busy}%
          </div>
          <div className="w-1/2 h-24 bg-[#0b4942] rounded flex items-center justify-center text-[#0fe9d2] text-sm">
            Moderate: {d.crowd.moderate}%
          </div>
        </div>
      </div>

      {/* Lighting */}
      <div className="bg-[#08302c] rounded-xl p-4 shadow-[0_0_18px_#0fe9d230] mb-6">
        <h2 className="font-semibold mb-2 text-lg">Lighting</h2>
        <p className="text-gray-300 text-sm">
          Well-lit Areas: {d.lighting.wellLit}%
        </p>
        <p className="text-gray-300 text-sm">
          Poorly Lit Areas: {d.lighting.poorlyLit}%
        </p>
      </div>

      <button className="w-full py-3 bg-[#0e2725] rounded-xl text-[#0fe9d2] shadow-[0_0_18px_#0fe9d240]">
        View Detailed Report
      </button>
    </div>
  );
}
