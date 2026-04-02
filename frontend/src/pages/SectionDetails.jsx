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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-blue-600 mb-4 hover:underline text-sm font-medium flex items-center"
      >
        ← Back
      </button>

      {/* Main Container - Exact mapping of your provided code structure */}
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Section {section.sectionNumber} — {section.lawType || "IPC"}
        </h2>

        {/* 📊 Confidence Score (Static for details page to match Ask AI UI) */}
        <p className="text-sm text-green-600 mb-2">
          Confidence: 100.00%
        </p>

        <p className="text-gray-700 mb-3 italic">{section.sectionName}</p>
        <p className="text-gray-600 mb-4">{section.description}</p>

        {section.punishment && (
          <p className="mb-2 text-gray-800">
            <span className="font-semibold">Punishment:</span> {section.punishment}
          </p>
        )}

        {section.investigationSteps?.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800">Investigation Steps:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {section.investigationSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {section.requiredDocuments?.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800">Required Documents:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {section.requiredDocuments.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {section.relatedSections?.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold text-gray-800">Related Sections:</h3>
            <p className="text-gray-700">
                {Array.isArray(section.relatedSections) 
                    ? section.relatedSections.join(", ") 
                    : section.relatedSections}
            </p>
          </div>
        )}

        {section.referenceLink && (
          <div className="mb-3">
            <a
              href={section.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline flex items-center gap-1"
            >
              📘 View Reference
            </a>
          </div>
        )}

        {section.notesForPolice && (
          <div className="mt-3">
            <h3 className="font-semibold text-gray-800">Notes for Police:</h3>
            <p className="text-gray-700">{section.notesForPolice}</p>
          </div>
        )}

        {section.importantCases?.length > 0 && (
          <div className="mt-3 border-t pt-4">
            <h3 className="font-semibold text-gray-800">Important Cases:</h3>
            {section.importantCases.map((c, i) => (
              <div key={i} className="p-3 border rounded bg-gray-50 mt-2">
                <p className="font-semibold text-gray-900">{c.caseName || c.title}</p>
                <p className="text-xs text-gray-600">{c.citation}</p>
                <p className="text-gray-700 text-sm mt-1">{c.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
