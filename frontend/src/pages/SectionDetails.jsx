import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../utils/axios"; 
import { sectionToCrimeMap } from "../utils/crimeMapping";

export default function SectionDetails() {
  const { id } = useParams();
  const locationState = useLocation();
  const [section, setSection] = useState(null);
  const [localStats, setLocalStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayCity, setDisplayCity] = useState("Detecting...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Legal Section Data
        const sectionRes = await api.get(`/api/sections/${id}`);
        const sData = sectionRes.data;
        setSection(sData);

        // 2. Determine Location
        let cityToQuery = "Mumbai"; // Default fallback
        
        if (locationState.state?.location) {
          // Use location passed from AskAI
          const passedLocation = locationState.state.location;
          setDisplayCity(passedLocation);
          cityToQuery = passedLocation.split(",")[0].trim();
        } else {
          // Fallback: Detect location directly if state is missing (on refresh)
          try {
            const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
            const { latitude: lat, longitude: lon } = pos.coords;
            const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const geoData = await geo.json();
            const detectedCity = geoData.address.city || geoData.address.town || "Mumbai";
            setDisplayCity(detectedCity);
            cityToQuery = detectedCity;
          } catch (err) {
            setDisplayCity("Mumbai (Default)");
            cityToQuery = "Mumbai";
          }
        }

        // 3. Fetch Statistics
        const statsRes = await api.get("/api/crime/stats-by-section");
        const allStats = statsRes.data?.data || statsRes.data || {};

        // 4. Match Section to CSV Category
        const sectionNum = String(sData.sectionNumber);
        const csvCategory = sectionToCrimeMap[sectionNum];

        // Normalize city for matching (e.g., "Navi Mumbai" -> "Mumbai" if needed by your CSV)
        const normalizedCity = cityToQuery.toLowerCase().includes("mumbai") ? "Mumbai" : cityToQuery;

        if (allStats[normalizedCity] && csvCategory) {
          const cityData = allStats[normalizedCity];
          const matchedKey = Object.keys(cityData).find(
            key => key.toUpperCase().trim() === csvCategory.toUpperCase().trim()
          );
          if (matchedKey) setLocalStats(cityData[matchedKey]);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, locationState]);

  if (loading) return <p className="p-10 text-center animate-pulse text-slate-500 font-medium">Analyzing Database...</p>;
  if (!section) return <p className="p-10 text-center text-red-500 font-bold">Section Not Found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 📍 Location Header */}
      <div className="flex items-center gap-2 text-slate-600 text-sm bg-white border border-slate-200 p-3 px-5 rounded-full w-fit shadow-sm">
        <span className="text-red-500">📍</span>
        <span>Stats for: <b className="text-slate-900">{displayCity}</b></span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6 text-blue-900 border-b pb-4">
          <h2 className="text-3xl font-extrabold uppercase">
            {section.lawType} — Section {section.sectionNumber}
          </h2>
        </div>

        <h3 className="text-xl font-semibold text-slate-700 mb-4">{section.sectionName}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              <span className="font-bold text-slate-800">Description:</span> {section.description}
            </p>
            
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
              <p className="text-xs font-bold text-orange-700 uppercase mb-1">Punishment Detail</p>
              <p className="text-gray-800 font-medium">{section.punishment}</p>
            </div>

            {/* Reference Link */}
            {section.referenceLink && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs font-bold text-blue-700 uppercase mb-1">Legal Source</p>
                <a href={section.referenceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm break-all">
                  {section.referenceLink}
                </a>
              </div>
            )}
          </div>

          {/* 📊 Statistics Card */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg border border-slate-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
              📊 Regional Analytics
            </h3>
            {localStats ? (
              <div className="space-y-6">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Total Incidents</span>
                  <span className="font-mono text-2xl font-bold">{localStats.total}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-emerald-400">Resolved Cases</span>
                  <span className="font-mono text-2xl font-bold">{localStats.solved}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-red-400">Unsolved (Pending)</span>
                  <span className="font-mono text-2xl font-bold">{localStats.total - localStats.solved}</span>
                </div>
              </div>
            ) : (
              <p className="text-center text-slate-500 py-10 italic">No historical data available for this category in {displayCity}.</p>
            )}
          </div>
        </div>

        {/* Protocol & Evidence Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 border-t pt-10">
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📋 Investigation Protocol</h4>
            <ul className="space-y-3">
              {section.investigationSteps?.map((step, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-3"><span className="text-blue-500 font-bold">•</span> {step}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📂 Required Evidence</h4>
            <ul className="space-y-3">
              {section.requiredDocuments?.map((doc, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-3"><span className="text-emerald-500">✔</span> {doc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
