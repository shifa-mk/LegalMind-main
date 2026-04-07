import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";
import { Skeleton } from "../components/ui/skeleton";

export default function SectionDetails() {
const { id } = useParams();
const navigate = useNavigate();
const locationState = useLocation();

const [section, setSection] = useState(null);
const [loading, setLoading] = useState(true);

// ✅ Get data from AskAI
const crimeData = locationState.state?.crimeData || null;
const userLocation = locationState.state?.location || "Unknown";

useEffect(() => {
const fetchDetails = async () => {
try {
setLoading(true);
const res = await api.get("/api/sections/${id}");
setSection(res.data);
} catch (err) {
console.error("Error fetching section detail:", err);
} finally {
setLoading(false);
}
};

if (id) fetchDetails();

}, [id]);

if (loading)
return (
<div className="p-6 max-w-4xl mx-auto">
<Skeleton className="h-96 w-full rounded-xl bg-gray-100" />
</div>
);

if (!section)
return (
<p className="p-6 text-center text-gray-500 font-medium">
Section not found.
</p>
);

return (
<div className="p-6 max-w-4xl mx-auto">

  {/* 🔙 Back */}
  <button
    onClick={() => navigate(-1)}
    className="text-blue-600 mb-4 hover:underline text-sm font-medium"
  >
    ← Back
  </button>

  {/* 📍 Location */}
  {userLocation && (
    <div className="mb-4 p-3 bg-blue-50 border rounded text-blue-700">
      📍 Location: <strong>{userLocation}</strong>
    </div>
  )}

  {/* Main Card */}
  <div className="p-6 bg-white border rounded-xl shadow-sm">

    <h2 className="text-xl font-bold text-gray-800 mb-1">
      Section {section.sectionNumber} — {section.lawType || "IPC"}
    </h2>

    <p className="text-sm text-green-600 mb-2">
      Confidence: 100.00%
    </p>

    <p className="text-gray-700 mb-3 italic">
      {section.sectionName}
    </p>

    <p className="text-gray-600 mb-4">
      {section.description}
    </p>

    {section.punishment && (
      <p className="mb-2 text-gray-800">
        <b>Punishment:</b> {section.punishment}
      </p>
    )}

    {section.investigationSteps?.length > 0 && (
      <div className="mb-3">
        <h3 className="font-semibold">Investigation Steps:</h3>
        <ul className="list-disc list-inside">
          {section.investigationSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    )}

    {section.requiredDocuments?.length > 0 && (
      <div className="mb-3">
        <h3 className="font-semibold">Required Documents:</h3>
        <ul className="list-disc list-inside">
          {section.requiredDocuments.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </div>
    )}

    {section.relatedSections?.length > 0 && (
      <div className="mb-3">
        <h3 className="font-semibold">Related Sections:</h3>
        <p>
          {Array.isArray(section.relatedSections)
            ? section.relatedSections.join(", ")
            : section.relatedSections}
        </p>
      </div>
    )}

    {section.referenceLink && (
      <a
        href={section.referenceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        📘 View Reference
      </a>
    )}

    {section.notesForPolice && (
      <div className="mt-3">
        <h3 className="font-semibold">Notes for Police:</h3>
        <p>{section.notesForPolice}</p>
      </div>
    )}

    {section.importantCases?.length > 0 && (
      <div className="mt-3">
        <h3 className="font-semibold">Important Cases:</h3>
        {section.importantCases.map((c, i) => (
          <div key={i} className="p-3 border rounded bg-gray-50 mt-2">
            <p className="font-semibold">{c.caseName || c.title}</p>
            <p className="text-xs text-gray-600">{c.citation}</p>
            <p className="text-sm mt-1">{c.summary}</p>
          </div>
        ))}
      </div>
    )}

    {/* 📊 Crime Data */}
    {crimeData ? (
      <div className="mt-4 p-3 bg-yellow-50 border rounded">
        <p className="font-semibold">
          📊 Crime Data ({crimeData.city})
        </p>

        <ul className="text-sm">
          <li>2020: {crimeData.cases?.["2020"]}</li>
          <li>2021: {crimeData.cases?.["2021"]}</li>
          <li>2022: {crimeData.cases?.["2022"]}</li>
        </ul>
      </div>
    ) : (
      <p className="mt-4 text-gray-500 text-sm">
        ⚠️ Crime data not available (open from Ask AI)
      </p>
    )}

  </div>
</div>

);
}
