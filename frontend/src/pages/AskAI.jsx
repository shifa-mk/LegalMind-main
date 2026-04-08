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
  const [cityOnly, setCityOnly] = useState("Mumbai"); // Default to Mumbai

  const navigate = useNavigate();

  // 📊 Fetch crime data - Memoized to prevent unnecessary recreations
  const fetchCrimeStats = useCallback(async () => {
    try {
      const res = await api.get("/api/crime/stats-by-section");
      setAllCrimeStats(res.data.data || res.data);
    } catch (err) {
      console.error("Crime API error:", err);
    }
  }, []);

  // 📍 GPS + Location detection
  useEffect(() => {
    // Initial fetch so stats exist even if GPS is slow
    fetchCrimeStats();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude: lat, longitude: lon } = pos.coords;
            const geo = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await geo.json();

            // Handle different naming conventions from OpenStreetMap
            const city = data.address.city || data.address.town || data.address.village || "Mumbai";
            const state = data.address.state || "";

            setCityOnly(city);
            setLocation(`${city}${state ? ", " + state : ""}`);
          } catch (err) {
            console.error("Geocoding failed:", err);
            setLocation("Mumbai, Maharashtra");
          }
        },
        () => setLocation("Mumbai (Default)")
      );
    }
  }, [fetchCrimeStats]);

  // 🔍 Ask AI
  const askAI = async () => {
    if (!query.trim()) {
      setMessage("⚠️ Please describe the incident first.");
      return;
    }

    try {
      setLoading(true);
      setResults([]);
      setMessage("");

      const { data } = await api.post("/api/ai/ask", { query });

      if (data.matchedSections?.length) {
        setResults(data.matchedSections);
      } else {
        setMessage("No relevant legal sections found for this incident.");
      }
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "AI Analysis failed"));
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => setQuery(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-800">🔎 Legal Search AI</h1>

      {/* 📍 Location Pill */}
      <div className="mb-6 flex items-center gap-2 text-blue-700 bg-blue-50 w-fit px-4 py-2 rounded-full border border-blue-100 shadow-sm text-sm">
        <span className="animate-pulse">📍</span>
        <span>Stats tuned for: <strong>{cityOnly}</strong></span>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the incident in detail..."
          className="w-full border-none focus:ring-0 text-lg text-slate-700 placeholder:text-slate-300 mb-4"
          rows={4}
        />

        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-50">
          <button onClick={askAI} disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex-1 md:flex-none">
            {loading ? "Analyzing Incident..." : "Search Database"}
          </button>
          
          <button onClick={startListening} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 flex items-center gap-2">
             🎤 Voice
          </button>

          <button
            onClick={() => navigate("/generate-fir", { state: { complaint: query, sections: results } })}
            className="bg-purple-50 text-purple-600 px-6 py-3 rounded-xl font-bold border border-purple-100 hover:bg-purple-100"
          >
            Draft FIR
          </button>
        </div>
      </div>

      {message && <div className="p-4 bg-orange-50 text-orange-700 rounded-xl border border-orange-100 mb-6">{message}</div>}

      {/* Results List */}
      <div className="space-y-6">
        {results.map((sec) => {
          // Normalize matching for the CSV
          const categoryKey = sectionToCrimeMap[String(sec.sectionNumber)];
          const cityData = allCrimeStats?.[cityOnly];
          
          // Match the category while ignoring case sensitivity
          const matchedKey = cityData ? Object.keys(cityData).find(k => k.toUpperCase() === categoryKey?.toUpperCase()) : null;
          const stats = matchedKey ? cityData[matchedKey] : null;

          return (
            <div key={sec._id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-slate-800">
                   Section {sec.sectionNumber} <span className="text-sm font-normal text-slate-400">({sec.lawType})</span>
                </h2>
                {sec.score && (
                  <div className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full font-bold">
                    {(sec.score * 100).toFixed(0)}% Relevance
                  </div>
                )}
              </div>
              
              <h3 className="text-slate-600 font-medium mb-3">{sec.sectionName}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{sec.description}</p>

              {stats && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Total Reports</p>
                    <p className="text-xl font-bold text-slate-700">{stats.total}</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <p className="text-[10px] uppercase text-emerald-500 font-bold tracking-wider">Solved</p>
                    <p className="text-xl font-bold text-emerald-700">{stats.solved}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate(`/section/${sec._id}`, { state: { location: cityOnly } })}
                className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
              >
                Deep Dive & Forensics
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
