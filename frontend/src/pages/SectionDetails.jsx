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
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Legal Section
        const sectionRes = await api.get(`/api/sections/${id}`);
        const sData = sectionRes.data;
        setSection(sData);

        // 2. Fetch Stats
        const statsRes = await api.get("/api/crime/stats-by-section");
        const allStats = statsRes.data?.data || statsRes.data || {};

        // 3. 📍 GPS Normalization Logic
        // We show the "real" GPS on top, but look up "Mumbai" in the CSV
        const rawLocation = locationState.state?.location || "Detecting...";
        const cleanCity = rawLocation.split(",")[0].trim();
        
        // If GPS is Navi Mumbai, we look for "Mumbai" in the stats object
        const dataCity = cleanCity.toLowerCase().includes("mumbai") ? "Mumbai" : cleanCity;

        const sectionNum = String(sData.sectionNumber);
        const csvCategory = sectionToCrimeMap[sectionNum];

        // 4. Safe Object check
        if (allStats && typeof allStats === 'object' && !Array.isArray(allStats)) {
          if (allStats[dataCity] && allStats[dataCity][csvCategory]) {
            setLocalStats(allStats[dataCity][csvCategory]);
          }
        }
      } catch (err) {
        console.error("SectionDetails Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, locationState]);

  if (loading) return <p className="p-10 text-center animate-pulse">Analyzing Legal Database...</p>;
  if (!section) return <p className="p-10 text-center text-red-500">Section Not Found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 📍 Top Location Header (Shows your REAL GPS) */}
      <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-100 p-3 rounded-lg w-fit">
        <span className="text-red-500">📍</span>
        <span>Location Detected: <b className="text-slate-800">{locationState.state?.location || "Navi Mumbai, Maharashtra"}</b></span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-900">
            {section.lawType} — Section {section.sectionNumber}
          </h2>
        </div>

        <h3 className="text-xl font-semibold text-slate-700 mb-4">{section.sectionName}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              <span className="font-bold text-slate-800">Description:</span> {section.description}
            </p>
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
              <p className="text-xs font-bold text-orange-700 uppercase mb-1">Punishment Detail</p>
              <p className="text-gray-800">{section.punishment}</p>
            </div>
          </div>

          {/* 📊 Regional Data Popup (Maps GPS to Mumbai Data) */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
              📊 Crime Stats for Mumbai
            </h3>
            {localStats ? (
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Total Cases</span>
                  <span className="font-mono text-xl">{localStats.total}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Solved Cases</span>
                  <span className="font-mono text-xl text-emerald-400">{localStats.solved}</span>
                </div>
                <p className="text-[10px] text-slate-500 italic">Showing historical data matched from your metropolitan area.</p>
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm text-center py-10">
                No local records found in the database for this specific section.
              </p>
            )}
          </div>
        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-slate-800 mb-3">📋 Police Investigation Steps</h4>
            <ul className="space-y-2">
              {section.investigationSteps?.map((step, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-blue-500 font-bold">•</span> {step}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-3">📂 Evidence Checklist</h4>
            <ul className="space-y-2">
              {section.requiredDocuments?.map((doc, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-emerald-500">✔</span> {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
