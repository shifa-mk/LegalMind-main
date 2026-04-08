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

        // 1. Fetch Legal Section from DB
        const sectionRes = await api.get(`/api/sections/${id}`);
        const sData = sectionRes.data;
        setSection(sData);

        // 2. Fetch Crime Stats from Backend
        const statsRes = await api.get("/api/crime/stats-by-section");
        const allStats = statsRes.data?.data || statsRes.data || {};

        // 3. Location Logic
        const rawLocation = locationState.state?.location || "Mumbai";
        const cleanCity = rawLocation.split(",")[0].trim();
        const dataCity = cleanCity.toLowerCase().includes("mumbai") ? "Mumbai" : cleanCity;

        // 4. Data Matching (Fixed Variable Scope)
        const sectionNum = String(sData.sectionNumber);
        const csvCategory = sectionToCrimeMap[sectionNum];

        if (allStats[dataCity] && csvCategory) {
          const cityData = allStats[dataCity]; // Defined here to fix the build error
          
          // Case-insensitive lookup in the city data
          const matchedKey = Object.keys(cityData).find(
            key => key.toUpperCase().trim() === csvCategory.toUpperCase().trim()
          );

          if (matchedKey) {
            setLocalStats(cityData[matchedKey]);
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

  if (loading) return <p className="p-10 text-center animate-pulse text-slate-500 font-medium">Analyzing Legal Database...</p>;
  if (!section) return <p className="p-10 text-center text-red-500 font-bold">Section Not Found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-slate-600 text-sm bg-white border border-slate-200 p-3 px-5 rounded-full w-fit shadow-sm">
        <span className="text-red-500">📍</span>
        <span>Location Detected: <b className="text-slate-900">{locationState.state?.location || "Navi Mumbai, Maharashtra"}</b></span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6 text-blue-900">
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
          </div>

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
                <div>
      <p className="text-[10px] uppercase font-bold text-red-500 tracking-tighter">Unsolved</p>
      <p className="text-lg font-bold text-red-600">
        {(stats.total - stats.solved) < 0 ? 0 : stats.total - stats.solved}
      </p>
    </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 italic text-sm">
                No matching historical records found for this category.
              </div>
            )}
          </div>
        </div>

        <hr className="my-10 border-slate-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📋 Investigation Protocol</h4>
            <ul className="space-y-3">
              {section.investigationSteps?.map((step, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-3">
                   <span className="text-blue-500 font-bold">•</span> {step}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">📂 Required Evidence</h4>
            <ul className="space-y-3">
              {section.requiredDocuments?.map((doc, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-3">
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
