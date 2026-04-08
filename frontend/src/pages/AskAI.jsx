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

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => setQuery(event.results[0][0].transcript);
    recognition.start();
  };

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
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
          const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          const data = await geo.json();
          const city = data.address.city || data.address.town || "Mumbai";
          setCityOnly(city);
          setLocation(`${city}, ${data.address.state}`);
        } catch (err) {
          setCityOnly("Mumbai");
          setLocation("Mumbai, Maharashtra");
        }
      },
      () => setLocation("Mumbai (Default)")
    );
  }, [fetchCrimeStats]);

  const askAI = async () => {
    if (!query.trim()) return setMessage("⚠️ Please enter a query.");
    try {
      setLoading(true);
      setResults([]);
      setMessage("");
      const { data } = await api.post("/api/ai/ask", { query });
      if (data.matchedSections?.length) setResults(data.matchedSections);
      else setMessage("No relevant sections found.");
    } catch (err) {
      setMessage("❌ Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🔎 Ask Legal AI</h1>

      {location && (
        <div className="mb-4 p-3 bg-blue-50 border rounded text-blue-700 text-sm">
          📍 Current Location: <strong>{location}</strong>
        </div>
      )}

      <div className="flex gap-3 mb-3">
        <button onClick={startListening} className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Speak</button>
        <button 
          onClick={() => navigate("/generate-fir", { state: { complaint: query, sections: results } })}
          className="bg-purple-600 text-white px-4 py-2 rounded font-semibold"
        >
          Generate FIR
        </button>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe the incident..."
        className="w-full border p-3 rounded mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      <button onClick={askAI} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded font-bold w-full md:w-auto">
        {loading ? "Analyzing..." : "Search Legal Database"}
      </button>

      {message && <div className="mt-4 p-4 bg-gray-100 border rounded">{message}</div>}

      <div className="mt-8 space-y-10">
        {results.map((sec) => {
          const categoryKey = sectionToCrimeMap[String(sec.sectionNumber)];
          const cityData = allCrimeStats?.[cityOnly];
          const matchedKey = cityData ? Object.keys(cityData).find(k => k.toUpperCase() === categoryKey?.toUpperCase()) : null;
          const stats = matchedKey ? cityData[matchedKey] : null;

          return (
            <div key={sec._id} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-black text-blue-900 uppercase">
                    {sec.lawType} — Section {sec.sectionNumber}
                  </h2>
                  <p className="text-lg font-bold text-slate-700 mt-1">{sec.sectionName}</p>
                </div>
                {sec.score && (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    {(sec.score * 100).toFixed(0)}% Match
                  </span>
                )}
              </div>

              {/* 1. Description (Full) */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</h4>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{sec.description}</p>
              </div>

              {/* 2. Punishment */}
              <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
                <h4 className="text-xs font-bold text-orange-700 uppercase mb-1">Punishment</h4>
                <p className="text-orange-900 font-medium">{sec.punishment || "As per legal guidelines."}</p>
              </div>

              {/* 3. Protocols & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-slate-50 rounded-xl border">
                  <h4 className="font-bold text-slate-800 mb-2 text-sm">📋 Protocol</h4>
                  <ul className="text-sm text-slate-600 space-y-1 list-disc ml-4">
                    {sec.investigationSteps?.map((step, i) => <li key={i}>{step}</li>) || <li>Standard police procedure</li>}
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border">
                  <h4 className="font-bold text-slate-800 mb-2 text-sm">📂 Evidence Required</h4>
                  <ul className="text-sm text-slate-600 space-y-1 list-disc ml-4">
                    {sec.requiredDocuments?.map((doc, i) => <li key={i}>{doc}</li>) || <li>Incident reports, witnesses</li>}
                  </ul>
                </div>
              </div>

              {/* 4. Analytics & Reference */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t">
                {stats && (
                  <div className="flex gap-6 text-center">
                    <div><p className="text-[10px] font-bold text-slate-400">TOTAL</p><p className="font-bold">{stats.total}</p></div>
                    <div><p className="text-[10px] font-bold text-emerald-500">SOLVED</p><p className="font-bold text-emerald-600">{stats.solved}</p></div>
                    <div><p className="text-[10px] font-bold text-red-500">UNSOLVED</p><p className="font-bold text-red-600">{stats.total - stats.solved}</p></div>
                  </div>
                )}
                {sec.referenceLink && (
                  <a href={sec.referenceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline font-medium">
                    Official Reference Link
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
