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

  useEffect(() => {
    // The async function must be defined clearly inside the effect
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Legal Section Details
        const sectionRes = await api.get(`/api/sections/${id}`);
        const sData = sectionRes.data;
        setSection(sData);

        // 2. Fetch Crime Statistics
        const statsRes = await api.get("/api/crime/stats-by-section");
        const allStats = statsRes.data?.data || statsRes.data || {};

        // 3. 📍 GPS Normalization Logic
        const rawLocation = locationState.state?.location || "Mumbai";
        const cleanCity = rawLocation.split(",")[0].trim();
        
        // Maps Navi Mumbai or other suburbs to the primary "Mumbai" key in your CSV
        const dataCity = cleanCity.toLowerCase().includes("mumbai") ? "Mumbai" : cleanCity;

        // 4. Map Section Number to CSV Category (e.g., "302" -> "MURDER")
        const sectionNum = String(sData.sectionNumber);
        const csvCategory = sectionToCrimeMap[sectionNum];
// This ensures "Fraud" from your map matches "FRAUD" in the CSV
        const stats = cityStats[csvCategory?.toUpperCase()];

        console.log(`Matching: City [${dataCity}] | Category [${csvCategory}]`);

        // 5. Extract Stats safely
        if (allStats && typeof allStats === 'object' && !Array.isArray(allStats)) {
          const cityStats = allStats[dataCity];
          if (cityStats && cityStats[csvCategory]) {
            setLocalStats(cityStats[csvCategory]);
          }
        }
      } catch (err) {
        console.error("SectionDetails Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, locationState]); // Properly closed dependency array

  if (loading) return <p className="p-10 text-center animate-pulse text-slate-500">Analyzing Legal Database...</p>;
  if (!section) return <p className="p-10 text-center text-red-500 font-bold">Section Not Found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 📍 Top Location Header */}
      <div className="flex items-center gap-2 text-slate-600 text-sm bg-white border border-slate-200 p-3 px-5 rounded-full w-fit shadow-sm">
        <span className="text-red-500 animate-bounce">📍</span>
        <span>Location Detected: <b className="text-slate-900">{locationState.state?.location || "Navi Mumbai, Maharashtra"}</b></span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-900">
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
          </div>

          {/* 📊 Jurisdictional Stats Card */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg border border-slate-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
              📊 Regional Trends: Mumbai
            </h3>
            {localStats ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-400 text-sm">Total Incidents</span>
                  <span className="font-mono text-2xl font-bold">{localStats.total}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-400 text-sm">Resolved Cases</span>
                  <span className="font-mono text-2xl text-emerald-400 font-bold">{localStats.solved}</span>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-2">
                  Data reflects aggregate historical trends for the Mumbai Metropolitan area.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 italic text-sm">
                No matching historical records for this category in the Mumbai database.
              </div>
            )}
          </div>
        </div>

        <hr className="my-10 border-slate-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📋</span> Investigation Protocol
            </h4>
            <ul className="space-y-3">
              {section.investigationSteps?.map((step, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-3 items-start">
                  <span className="bg-blue-50 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span> 
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-emerald-600">📂</span> Required Evidence
            </h4>
            <ul className="space-y-3">
              {section.requiredDocuments?.map((doc, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-3 items-start">
                  <span className="text-emerald-500 mt-0.5">✔</span> {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
