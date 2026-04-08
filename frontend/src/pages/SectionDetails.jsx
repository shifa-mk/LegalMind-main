import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";
import { Skeleton } from "../components/ui/skeleton";
import { sectionToCrimeMap } from "../utils/crimeMapping";
import { ShieldCheck, ShieldAlert, BarChart3, ArrowLeft, MapPin } from "lucide-react";

export default function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const locationState = useLocation();

  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localStats, setLocalStats] = useState(null);

  // Default to "Mumbai" or "Unknown" if locationState is empty
  const userLocation = locationState.state?.location || "Mumbai";

  useEffect(() => {
 const fetchData = async () => {
  try {
    setLoading(true);
    
    // 1. Fetch Legal Section
    const sectionRes = await api.get(`/api/sections/${id}`);
    const sectionData = sectionRes.data;
    setSection(sectionData);

    // 2. Fetch Crime Stats
    const statsRes = await api.get("/api/crime/stats-by-section");
    
    // SAFETY CHECK: Ensure allStats is at least an empty object, never null
    const allStats = statsRes.data?.data || statsRes.data || {}; 

    // 3. Location Handling
    const rawLocation = locationState.state?.location || "Mumbai";
    const cleanCity = rawLocation.split(',')[0].trim();
    
    // 4. Data Mapping
    const sectionNum = String(sectionData.sectionNumber);
    const csvCategory = sectionToCrimeMap[sectionNum];

    // SAFETY CHECK: Check if the city exists in the keys before looking for the category
    if (Object.keys(allStats).length > 0 && allStats[cleanCity] && allStats[cleanCity][csvCategory]) {
      setLocalStats(allStats[cleanCity][csvCategory]);
    } else {
      console.warn(`Data mismatch: City: ${cleanCity}, Category: ${csvCategory}`);
      setLocalStats(null);
    }
  } catch (err) {
    console.error("SectionDetails.jsx:51 Error fetching data:", err);
  } finally {
    setLoading(false);
  }
}
    };

    if (id) fetchData();
  }, [id, userLocation]);

  if (loading)
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );

  if (!section)
    return <p className="p-6 text-center text-gray-500 font-medium">Section not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm">
          <MapPin size={14} />
          <span>Jurisdiction: <strong>{userLocation}</strong></span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-start mb-2">
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
              {section.lawType || "IPC"} — Section {section.sectionNumber}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
              CONFIDENCE 100%
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            {section.sectionName}
          </h1>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BarChart3 size={16} /> Regional Incident Data
            </h3>
            
            {localStats ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Total Logged</p>
                  <p className="text-2xl font-mono font-bold text-slate-800">{localStats.total}</p>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-1 text-emerald-600 mb-1">
                    <ShieldCheck size={14} />
                    <p className="text-[10px] font-bold uppercase">Solved</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-emerald-700">{localStats.solved}</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <div className="flex items-center gap-1 text-orange-600 mb-1">
                    <ShieldAlert size={14} />
                    <p className="text-[10px] font-bold uppercase">Unsolved</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-orange-700">{localStats.unsolved}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center">
                <p className="text-sm text-slate-500 italic">
                  No records found for "{sectionToCrimeMap[section.sectionNumber] || 'this section'}" in {userLocation}.
                </p>
              </div>
            )}
          </div>

          <div className="prose prose-slate max-w-none">
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Legal Definition</h3>
              <p className="text-slate-600 leading-relaxed">{section.description}</p>
            </section>

            {section.punishment && (
              <section className="bg-amber-50/50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <h3 className="text-sm font-bold text-amber-800 uppercase">Prescribed Punishment</h3>
                <p className="text-slate-700 mt-1 font-medium">{section.punishment}</p>
              </section>
            )}

            {section.investigationSteps?.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Investigation Protocol</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {section.investigationSteps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="font-bold text-blue-600">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {section.importantCases?.length > 0 && (
              <section>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Landmark Judgments</h3>
                <div className="space-y-4">
                  {section.importantCases.map((c, i) => (
                    <div key={i} className="p-4 border border-slate-200 rounded-xl hover:border-blue-200 transition-colors">
                      <p className="font-bold text-slate-900">{c.caseName || c.title}</p>
                      <p className="text-[11px] text-blue-600 font-mono mt-1">{c.citation}</p>
                      <p className="text-sm text-slate-600 mt-2">{c.summary}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
