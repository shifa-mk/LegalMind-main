import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SectionDetails() {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/sections/${id}`)
      .then((res) => setSection([res.data])) // wrap in array for map UI
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="p-6 text-gray-500 font-medium text-center">Loading...</p>;

  if (!section?.length)
    return <p className="p-6 text-gray-500 font-medium text-center">Section not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {section.map((sec) => (
        <div key={sec._id} className="p-6 bg-white border rounded-xl shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Section {sec.sectionNumber} — {sec.lawType}
          </h2>
          <p className="text-gray-700 mb-3 italic">{sec.sectionName}</p>
          <p className="text-gray-600 mb-4">{sec.description}</p>

          {sec.punishment && (
            <p className="mb-2">
              <span className="font-semibold text-gray-800">Punishment:</span> {sec.punishment}
            </p>
          )}

          {sec.investigationSteps?.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Investigation Steps:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {sec.investigationSteps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {sec.requiredDocuments?.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Required Documents:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {sec.requiredDocuments.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          {sec.relatedSections?.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Related Sections:</h3>
              <p className="text-gray-700">{sec.relatedSections.join(", ")}</p>
            </div>
          )}

          {sec.referenceLink && (
            <div className="mb-3">
              <a
                href={sec.referenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                📘 View Reference
              </a>
            </div>
          )}

          {sec.notesForPolice && (
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Notes for Police:</h3>
              <p className="text-gray-700">{sec.notesForPolice}</p>
            </div>
          )}

          {sec.importantCases?.length > 0 && (
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800">Important Cases:</h3>
              <div className="space-y-2">
                {sec.importantCases.map((c, i) => (
                  <div key={i} className="p-3 border rounded-md bg-gray-50">
                    <p className="font-semibold text-gray-800">{c.caseName}</p>
                    <p className="text-sm text-gray-600">{c.citation}</p>
                    <p className="text-gray-700 mt-1">{c.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
