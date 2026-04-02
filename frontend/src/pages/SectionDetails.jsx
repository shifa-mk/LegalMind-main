import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { Skeleton } from "../components/ui/skeleton";

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
        setSection(res.data);
      } catch (err) {
        console.error("Error fetching section detail:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="p-6 max-w-4xl mx-auto"><Skeleton className="h-96 w-full rounded-xl bg-gray-100" /></div>;
  
  if (!section) return <p className="p-6 text-center text-gray-500 font-medium">Section not found.</p>;

  // Mapping fields to match your Ask AI screenshot exactly
  const sName = section.sectionName || section.title || "";
  const sNumber = section.sectionNumber || section.section || "";
  const sLaw = section.lawType || "IPC";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-blue-600 mb-4 hover:underline text-sm font-medium flex items-center"
      >
        ← Back
      </button>

      {/* Main Card - Matching image_601d0f.png exactly */}
      <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
        
        {/* Title Header */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Section {sNumber} — {sLaw}
          </h2>
          {/* Confidence Score Placeholder (Matches Ask AI UI) */}
          <p className="text-green-600 text-sm font-medium">Confidence: 100%</p>
        </div>

        {/* Section Name / Subtitle */}
        <p className="text-gray-700 italic font-medium">{sName}</p>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {section.description}
        </p>

        {/* Punishment */}
        {section.punishment && (
          <p className="text-gray-800">
            <span className="font-bold">Punishment:</span> {section.punishment}
          </p>
        )}

        {/* Investigation Steps */}
        {section.investigationSteps?.length > 0 && (
          <div className="pt-2">
            <h3 className="font-bold text-gray-900 mb-2">Investigation Steps:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {section.investigationSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Required Documents */}
        {section.requiredDocuments?.length > 0 && (
          <div className="pt-2">
            <h3 className="font-bold text-gray-900 mb-2">Required Documents:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {section.requiredDocuments.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Sections */}
        {section.relatedSections?.length > 0 && (
          <div className="pt-2">
            <h3 className="font-bold text-gray-900 mb-1">Related Sections:</h3>
            <p className="text-gray-700">
              {Array.isArray(section.relatedSections) 
                ? section.relatedSections.join(", ") 
                : section.relatedSections}
            </p>
          </div>
        )}

        {/* Reference Link */}
        {section.referenceLink && (
          <div className="pt-4">
            <a
              href={section.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline flex items-center gap-1 font-medium"
            >
              <span role="img" aria-label="book">📘</span> View Reference
            </a>
          </div>
        )}

        {/* Notes for Police */}
        {section.notesForPolice && (
          <div className="pt-2">
            <h3 className="font-bold text-gray-900 mb-1">Notes for Police:</h3>
            <p className="text-gray-700">{section.notesForPolice}</p>
          </div>
        )}

        {/* Important Cases */}
        {section.importantCases?.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">Important Cases:</h3>
            <div className="space-y-4">
              {section.importantCases.map((c, i) => (
                <div key={i} className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                  <p className="font-bold text-gray-900">{c.caseName || c.title}</p>
                  <p className="text-xs text-gray-500 mb-1">{c.citation}</p>
                  <p className="text-sm text-gray-700">{c.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
