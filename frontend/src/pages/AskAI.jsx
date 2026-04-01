import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  // 🎤 Speech to Text
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };
    recognition.start();
  };

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
        placeholder="Describe the incident (e.g., 'car theft', 'illegal weapon possession')..."
        className="w-full border p-3 rounded mb-4 shadow-sm focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      {/* Search Button */}
      <button
        onClick={askAI}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Message */}
      {message && (
        <div className="mt-4 p-4 bg-gray-100 border rounded text-gray-700">
          {message}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6 space-y-6">
          {results.map((sec) => (
            <div key={sec._id} className="p-6 bg-white border rounded-xl shadow-sm">

              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Section {sec.sectionNumber} — {sec.lawType}
              </h2>

              {/* 📊 Confidence Score */}
              {sec.score && (
                <p className="text-sm text-green-600 mb-2">
                  Confidence: {(sec.score * 100).toFixed(2)}%
                </p>
              )}

              <p className="text-gray-700 mb-3 italic">{sec.sectionName}</p>
              <p className="text-gray-600 mb-4">{sec.description}</p>

              {sec.punishment && (
                <p className="mb-2">
                  <span className="font-semibold">Punishment:</span> {sec.punishment}
                </p>
              )}

              {sec.investigationSteps?.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold">Investigation Steps:</h3>
                  <ul className="list-disc list-inside">
                    {sec.investigationSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {sec.requiredDocuments?.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold">Required Documents:</h3>
                  <ul className="list-disc list-inside">
                    {sec.requiredDocuments.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {sec.relatedSections?.length > 0 && (
                <div className="mb-3">
                  <h3 className="font-semibold">Related Sections:</h3>
                  <p>{sec.relatedSections.join(", ")}</p>
                </div>
              )}

              {sec.referenceLink && (
                <a
                  href={sec.referenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  📘 View Reference
                </a>
              )}

              {sec.notesForPolice && (
                <div className="mt-3">
                  <h3 className="font-semibold">Notes for Police:</h3>
                  <p>{sec.notesForPolice}</p>
                </div>
              )}

              {sec.importantCases?.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold">Important Cases:</h3>
                  {sec.importantCases.map((c, i) => (
                    <div key={i} className="p-3 border rounded bg-gray-50 mt-2">
                      <p className="font-semibold">{c.caseName}</p>
                      <p className="text-sm text-gray-600">{c.citation}</p>
                      <p>{c.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}