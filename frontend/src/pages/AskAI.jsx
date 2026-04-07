import { useState, useEffect } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AskAI() {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [crimeData, setCrimeData] = useState(null);
const [location, setLocation] = useState("");

const navigate = useNavigate();

// 🎤 Speech to Text
const startListening = () => {
const recognition = new window.webkitSpeechRecognition();
recognition.onresult = (event) => {
setQuery(event.results[0][0].transcript);
};
recognition.start();
};

// 📊 Fetch crime data
const fetchCrime = async (city) => {
try {
const res = await api.post("/api/crime/crime-data", { city });
setCrimeData(res.data);
} catch (err) {
console.error("Crime API error:", err);
}
};

// 📍 GPS + Location detection
useEffect(() => {
navigator.geolocation.getCurrentPosition(
async (pos) => {
const lat = pos.coords.latitude;
const lon = pos.coords.longitude;

    try {
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await geo.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.state;

      const state = data.address.state;

      setLocation(`${city}, ${state}`);

      fetchCrime(city);

    } catch (err) {
      console.error("Location error:", err);
      setLocation("Location unavailable");
    }
  },
  () => {
    setLocation("Mumbai (default)");
    fetchCrime("Mumbai");
  }
);

}, []);

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
<div className="p-6 max-w-4xl mx-auto">

  <h1 className="text-2xl font-bold mb-4 text-gray-800">
    🔎 Ask Legal AI
  </h1>

  {/* 📍 Location Display */}
  {location && (
    <div className="mb-4 p-3 bg-blue-50 border rounded text-blue-700">
      📍 Current Location: <strong>{location}</strong>
    </div>
  )}

  {/* 🎤 + FIR Buttons */}
  <div className="flex gap-3 mb-3">
    <button
      onClick={startListening}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Speak
    </button>

    <button
      onClick={() =>
        navigate("/generate-fir", {
          state: { complaint: query, sections: results }
        })
      }
      className="bg-purple-600 text-white px-4 py-2 rounded"
    >
      Generate FIR
    </button>
  </div>

  {/* Input */}
  <textarea
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Describe the incident..."
    className="w-full border p-3 rounded mb-4"
    rows={4}
  />

  {/* Search */}
  <button
    onClick={askAI}
    disabled={loading}
    className="bg-blue-600 text-white px-6 py-2 rounded"
  >
    {loading ? "Searching..." : "Search"}
  </button>

  {/* Message */}
  {message && (
    <div className="mt-4 p-4 bg-gray-100 border rounded">
      {message}
    </div>
  )}

  {/* Results */}
  {results.length > 0 && (
    <div className="mt-6 space-y-6">
      {results.map((sec) => (
        <div key={sec._id} className="p-6 bg-white border rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Section {sec.sectionNumber} — {sec.lawType}
          </h2>

          {sec.score && (
            <p className="text-sm text-green-600">
              Confidence: {(sec.score * 100).toFixed(2)}%
            </p>
          )}

          <p className="italic">{sec.sectionName}</p>
          <p>{sec.description}</p>

          {/* 📊 Crime Data INSIDE section */}
          {crimeData && (
            <div className="mt-3 p-3 bg-yellow-50 border rounded">
              <p className="font-semibold">
                📊 Crime Data ({crimeData.city})
              </p>

              <ul className="text-sm">
                <li>2020: {crimeData.cases?.["2020"]}</li>
                <li>2021: {crimeData.cases?.["2021"]}</li>
                <li>2022: {crimeData.cases?.["2022"]}</li>
              </ul>
            </div>
          )}

        </div>
      ))}
    </div>
  )}
</div>

);
}
