import { useState, useEffect, useCallback } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { sectionToCrimeMap } from "../utils/crimeMapping";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [allCrimeStats, setAllCrimeStats] = useState(null);
  const [location, setLocation] = useState("");
  const [cityOnly, setCityOnly] = useState("Mumbai");

  const navigate = useNavigate();

  const fetchCrimeStats = useCallback(async () => {
    try {
      const res = await api.get("/api/crime/stats-by-section");
      setAllCrimeStats(res.data.data || res.data);
    } catch (err) {
      console.error("Crime API error:", err);
    }
  }, []);

  useEffect(() => {
    fetchCrimeStats();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude: lat, longitude: lon } = pos.coords;
            const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await geo.json();
            const city = data.address.city || data.address.town || data.address.village || "Mumbai";
            setCityOnly(city);
            setLocation(`${city}, ${data.address.state || ""}`);
          } catch (err) {
            setLocation("Mumbai, Maharashtra");
          }
        },
        () => setLocation("Mumbai (Default)")
      );
    }
  }, [fetchCrimeStats]);

  const askAI = async () => {
    if (!query.trim()) return setMessage("⚠️ Please describe the incident first.");
    try {
      setLoading(true);
      setMessage("");
      const { data } = await api.post("/api/ai/ask", { query });
      data.matchedSections?.length ? setResults(data.matchedSections) : setMessage("No relevant sections found.");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "AI Analysis failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-800">🔎 Legal Search AI</h1>
      <div className="mb-6 flex items-center gap-2 text-blue-700 bg-blue-50 w-fit px-4 py-2 rounded-full border border-blue-100 shadow-sm text-sm">
        <span className="animate-pulse">📍</span>
        <span>Stats tuned for: <strong>{cityOnly}</strong></span>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the incident in detail..."
          className="w-full border-none focus:ring-0 text-lg text-slate-700 mb-4"
          rows={4}
        />
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-50">
          <button onClick={askAI} disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            {loading ? "Analyzing..." : "Search Database"}
          </button>
          <button onClick={() => navigate("/generate-fir", { state: { complaint: query, sections: results } })} className="bg-purple-50 text-purple-600 px-6 py-3 rounded-xl font-bold border border-purple-100 hover:bg-purple-100">
            Draft FIR
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {results.map((sec) => {
          const categoryKey = sectionToCrimeMap[String(sec.sectionNumber)];
          const cityData = allCrimeStats?.[cityOnly];
          const matchedKey = cityData ? Object.keys(cityData).find(k => k.toUpperCase() === categoryKey?.toUpperCase()) : null;
          const stats = matchedKey ? cityData[matchedKey] : null;

          return (
            <div key={sec._id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-slate-800">Section {sec.sectionNumber} ({sec.lawType})</h2>
                {sec.score && <div className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-bold">{(sec.score * 100).toFixed(0)}% Match</div>}
              </div>
              <h3 className="text-slate-600 font-medium mb-3">{sec.sectionName}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{sec.description}</p>

              {/* Added Reference Link */}
              {sec.referenceLink && (
                <div className="mb-4 text-xs bg-slate-50 p-2 rounded">
                  <span className="font-bold">Source: </span>
                  <a href={sec.referenceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{sec.referenceLink}</a>
                </div>
              )}

              {/* Stats Grid with Unsolved */}
              {stats && (
                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <p className="text-[9px] uppercase font-bold text-slate-400">Total</p>
                    <p className="font-bold text-slate-700">{stats.total}</p>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                    <p className="text-[9px] uppercase font-bold text-emerald-500">Solved</p>
                    <p className="font-bold text-emerald-600">{stats.solved}</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                    <p className="text-[9px] uppercase font-bold text-red-500">Unsolved</p>
                    <p className="font-bold text-red-600">{stats.total - stats.solved}</p>
                  </div>
                </div>
              )}

              <button onClick={() => navigate(`/section/${sec._id}`, { state: { location: cityOnly } })} className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
                Deep Dive & Forensics
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
