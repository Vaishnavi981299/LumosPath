import { useState } from "react";
import Splash from "./pages/Splash";
import MapHome from "./pages/MapHome";
import RouteCompare from "./pages/RouteCompare";
import SafetyReport from "./pages/SafetyReport";
import SOS from "./pages/SOS";

export default function App() {
  const [page, setPage] = useState("splash");

  return (
    <div className="max-w-[430px] mx-auto h-screen overflow-hidden bg-[#0b0b0b] text-white">
      {page === "splash" && <Splash onContinue={() => setPage("map")} />}
      {page === "map" && <MapHome navigate={setPage} />}
      {page === "compare" && <RouteCompare navigate={setPage} />}
      {page === "report" && <SafetyReport navigate={setPage} />}
      {page === "sos" && <SOS navigate={setPage} />}
    </div>
  );
}
