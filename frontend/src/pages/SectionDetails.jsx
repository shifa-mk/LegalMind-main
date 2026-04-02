import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios"; // Use our custom API utility
import { Skeleton } from "../components/ui/skeleton";
import { ArrowLeft, Scale, BookOpen, Gavel } from "lucide-react";

export default function SectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/sections/${id}`);
        setSection(res.data); // No need to wrap in array
      } catch (err) {
        console.error("Error fetching section detail:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="p-10"><Skeleton className="h-64 w-full bg-gray-100 rounded-xl" /></div>;
  
  if (!section) return <p className="p-10 text-center text-gray-500">Section details not found.</p>;

  // Safety fallbacks for field names
  const sName = section.sectionName || section.title || "Unknown Section";
  const sNumber = section.sectionNumber || section.section || "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-600 mb-6 hover:underline font-medium"
      >
        <ArrowLeft size={18} className="mr-2" /> Back
      </button>

      <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-900 p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Scale size={20} className="text-amber-400" />
            <span className="uppercase tracking-widest text-xs font-bold text-blue-200">
              {section.lawType || "Legal Code"}
            </span>
          </div>
          <h1 className="text-3xl font-black">
            Section {sNumber}: {sName}
          </h1>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          <div>
            <h3 className="flex items-center text-lg font-bold text-blue-900 mb-3">
              <BookOpen size={18} className="mr-2" /> Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{section.description}</p>
          </div>

          {section.punishment && (
            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400">
              <h3 className="flex items-center text-lg font-bold text-amber-900 mb-2">
                <Gavel size={18} className="mr-2" /> Punishment
              </h3>
              <p className="text-amber-800 italic font-medium">{section.punishment}</p>
            </div>
          )}

          {/* Investigation Steps */}
          {section.investigationSteps?.length > 0 && (
            <div>
              <h3 className="font-bold text-blue-900 mb-3 text-lg">Investigation Protocol</h3>
              <ul className="grid gap-2">
                {section.investigationSteps.map((step, i) => (
                  <li key={i} className="flex items-start bg-gray-50 p-3 rounded-lg border">
                    <span className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Reference */}
          {section.referenceLink && (
            <div className="pt-4 border-t">
              <a
                href={section.referenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition"
              >
                📘 Official Reference Document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
