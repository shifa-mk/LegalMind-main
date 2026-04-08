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

  // 🎤 Speech to Text (Speak Button)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };
    recognition.start();
  };

  // 📊 Fetch crime data
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
    fetchCrimeStats();
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await geo.json();
          const city = data.address.city || data.address.town || data.address.village || "Mumbai";
          const state = data.address.state;
          setCityOnly(city);
          setLocation(`${city}, ${state}`);
        } catch (err) {
          setLocation("Mumbai, Maharashtra");
          setCityOnly("Mumbai");
        }
      },
      () => {
        setLocation("Mumbai (default)");
        setCityOnly("Mumbai");
      }
    );
  }, [fetchCrimeStats]);

  // 🔍 Ask AI
  const askAI = async () => {
    if (!query.trim()) {
      setMessage("⚠️ Please enter a query.");
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
        setMessage("No relevant sections found.");
      }
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Request failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🔎 Ask Legal AI</h1>

      {/* 📍 Location Display (Original Blue Box) */}
      {location && (
        <div className="mb-4 p-3 bg-blue-50 border rounded text-blue-700">
          📍 Current Location: <strong>{location}</strong>
        </div>
      )}

      {/* 🎤 Speak + FIR Buttons (Original Colors) */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={startListening}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold"
        >
          Speak
        </button>

        <button
          onClick={() =>
            navigate("/generate-fir", {
              state: { complaint: query, sections: results }
            })
          }
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-semibold"
        >
          Generate FIR
        </button>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe the incident (e.g., Someone stole my bag at the station...)"
        className="w-full border p-3 rounded mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        rows={4}
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition-colors"
      >
        {loading ? "Analyzing..." : "Search Legal Database"}
      </button>

      {message && <div className="mt-4 p-4 bg-gray-100 border rounded">{message}</div>}

      {/* Results (Original Card Style) */}
      {results.length > 0 && (
        <div className="mt-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-700">Relevant Legal Sections:</h2>
          {results.map((sec) => {
            const categoryKey = sectionToCrimeMap[String(sec.sectionNumber)];
            const cityData = allCrimeStats?.[cityOnly];
            const matchedKey = cityData ? Object.keys(cityData).find(k => k.toUpperCase() === categoryKey?.toUpperCase()) : null;
            const stats = matchedKey ? cityData[matchedKey] : null;

            return (
              <div key={sec._id} className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-blue-800">
                      Section {sec.sectionNumber} — {sec.lawType || "IPC"}
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 mb-2">{sec.sectionName}</p>
                  </div>
                  {sec.score && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                      {(sec.score * 100).toFixed(0)}% Match
                    </span>
                  )}
                </div>

                <p className="text-gray-700 line-clamp-3 mb-4">{sec.description}</p>

                {/* Reference Link (Direct Display) */}
                {sec.referenceLink && (
                  <p className="mb-4 text-xs">
                    <b>Reference:</b>{" "}
                    <a href={sec.referenceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                      {sec.referenceLink}
                    </a>
                  </p>
                )}

                {/* 📊 Crime Data Preview (Original Flex Layout with Unsolved) */}
                {stats && (
                  <div className="mb-4 p-3 bg-slate-50 border rounded-lg flex justify-around text-center">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Total in {cityOnly}</p>
                      <p className="font-bold text-slate-700">{stats.total}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-emerald-500">Solved</p>
                      <p className="font-bold text-emerald-600">{stats.solved}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-red-500">Unsolved</p>
                      <p className="font-bold text-red-600">{stats.total - stats.solved}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate(`/section/${sec._id}`, { state: { location: cityOnly } })}
                  className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  View Full Legal Details & Analytics
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
