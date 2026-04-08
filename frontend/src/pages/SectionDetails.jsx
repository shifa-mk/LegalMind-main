import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../utils/axios"; // Use your api utility, NOT raw axios
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

        // 1. Fetch Legal Section Details
        const sectionRes = await api.get(`/api/sections/${id}`);
        setSection(sectionRes.data);

        // 2. Fetch Crime Stats and match with GPS location
        const statsRes = await api.get("/api/crime/stats-by-section");
        const allStats = statsRes.data?.data || statsRes.data || {};

        // Get location from navigation state (passed from AskAI)
        const rawLocation = locationState.state?.location || "Mumbai";
        const cleanCity = rawLocation.split(",")[0].trim();
        const normalizedCity = cleanCity.includes("Mumbai") ? "Mumbai" : cleanCity;

        const sectionNum = String(sectionRes.data.sectionNumber);
        const csvCategory = sectionToCrimeMap[sectionNum];

        if (allStats[normalizedCity] && allStats[normalizedCity][csvCategory]) {
          setLocalStats(allStats[normalizedCity][csvCategory]);
        }
      } catch (err) {
        console.error("Error fetching section details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, locationState]);

  if (loading) return <p className="p-10 text-center animate-pulse">Loading legal data...</p>;
  if (!section) return <p className="p-10 text-center text-red-500">Section not found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-900">
            {section.lawType} — Section {section.sectionNumber}
          </h2>
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
            Official Reference
          </span>
        </div>

        <h3 className="text-xl font-semibold text-slate-700 mb-4">{section.sectionName}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              <span className="font-bold text-slate-800">Description:</span> {section.description}
            </p>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-sm font-bold text-red-700 uppercase mb-1">Punishment</p>
              <p className="text-gray-800">{section.punishment}</p>
            </div>
          </div>

          {/* 📊 Regional Incident Data (GPS Triggered) */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-inner">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              📊 Regional Data: {locationState.state?.location || "Mumbai"}
            </h3>
            {localStats ? (
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span>Total Reported Cases</span>
                  <span className="font-mono text-xl text-blue-400">{localStats.total}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span>Solved/Closed</span>
                  <span className="font-mono text-xl text-emerald-400">{localStats.solved}</span>
                </div>
                <p className="text-[10px] text-slate-400 italic mt-2">
                  *Based on 2020-2022 dataset trends for this specific crime category.
                </p>
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm text-center py-10">
                No local historical data available for this section in your current area.
              </p>
            )}
          </div>
        </div>

        <hr className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Investigation Steps */}
          <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              📋 Investigation Protocol
            </h3>
            <ul className="space-y-2">
              {section.investigationSteps?.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              📂 Required Evidence/Docs
            </h3>
            <ul className="space-y-2">
              {section.requiredDocuments?.map((doc, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600 items-start">
                  <span className="text-emerald-500">✔</span> {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
        <p className="text-sm text-slate-500">
          <span className="font-bold">Legal Note:</span> {section.notesForPolice}
        </p>
      </div>
    </div>
  );
}
