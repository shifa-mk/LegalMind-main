import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { Skeleton } from "../components/ui/skeleton";

export default function SectionDetails() {
const { id } = useParams();
const navigate = useNavigate();

const [section, setSection] = useState(null);
const [crimeData, setCrimeData] = useState(null);
const [location, setLocation] = useState("");
const [loading, setLoading] = useState(true);

// ✅ FETCH SECTION (OLD LOGIC - SAFE)
useEffect(() => {
const fetchDetails = async () => {
try {
setLoading(true);
const res = await api.get(`/api/sections/${id}`);

    // 🔥 SAFE HANDLING
    setSection(res.data.section || res.data);

  } catch (err) {
    console.error("Error fetching section detail:", err);
  } finally {
    setLoading(false);
  }
};

if (id) fetchDetails();

}, [id]);

// ✅ GPS + CRIME DATA (SEPARATE - WON’T BREAK UI)
useEffect(() => {
const fetchCrime = async (city) => {
try {
const res = await api.post("/api/crime/crime-data", { city });
setCrimeData(res.data);
} catch (err) {
console.error("Crime fetch error:", err);
}
};

navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    try {
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await geo.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.state;

      setLocation(city);
      fetchCrime(city);

    } catch (err) {
      console.error("Geo error:", err);
    }
  },
  () => {
    // fallback
    setLocation("Mumbai");
    fetchCrime("Mumbai");
  }
);

}, []);

if (loading) {
return (
<div className="p-6 max-w-4xl mx-auto">
<Skeleton className="h-96 w-full rounded-xl bg-gray-100" />
</div>
);
}

if (!section) {
return (
<p className="p-6 text-center text-gray-500 font-medium">
Section not found.
</p>
);
}

return (
<div className="p-6 max-w-4xl mx-auto">

  {/* 🔙 Back */}
  <button
    onClick={() => navigate(-1)}
    className="text-blue-600 mb-4 hover:underline text-sm font-medium"
  >
    ← Back
  </button>

  {/* 📍 LOCATION */}
  {location && (
    <div className="mb-4 p-3 bg-blue-50 border rounded">
      📍 Location: <b>{location}</b>
    </div>
  )}

  <div className="p-6 bg-white border rounded-xl shadow-sm">

    <h2 className="text-xl font-bold text-gray-800 mb-1">
      Section {section.sectionNumber} — {section.lawType || "IPC"}
    </h2>

    <p className="text-sm text-green-600 mb-2">
      Confidence: 100%
    </p>

    <p className="text-gray-700 mb-3 italic">
      {section.sectionName}
    </p>

    <p className="text-gray-600 mb-4">
      {section.description}
    </p>

    {section.punishment && (
      <p className="mb-2">
        <span className="font-semibold">Punishment:</span> {section.punishment}
      </p>
    )}
      {/* Investigation Steps */}
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

{/* Required Documents */}
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

{/* Related Sections */}
{section.relatedSections?.length > 0 && (
  <div className="mb-3">
    <h3 className="font-semibold">Related Sections:</h3>
    <p>{section.relatedSections.join(", ")}</p>
  </div>
)}
{section.referenceLink && (
  <a href={section.referenceLink}>...</a>
)}
{/* Important Cases */}
{section.importantCases?.length > 0 && (
  <div className="mt-3">
    <h3 className="font-semibold">Important Cases:</h3>
    {section.importantCases.map((c, i) => (
      <div key={i} className="p-3 border rounded bg-gray-50 mt-2">
        <p className="font-semibold">{c.caseName}</p>
        <p className="text-sm text-gray-600">{c.citation}</p>
        <p>{c.summary}</p>
      </div>
    ))}
  </div>
)}

    {/* 📊 CRIME DATA */}
    {crimeData && (
      <div className="mt-4 p-4 bg-yellow-50 border rounded">
        <h3 className="font-semibold mb-2">
          📊 Crime Data ({location})
        </h3>

        <ul className="text-sm">
          <li>2020: {crimeData.cases?.["2020"] || "N/A"}</li>
          <li>2021: {crimeData.cases?.["2021"] || "N/A"}</li>
          <li>2022: {crimeData.cases?.["2022"] || "N/A"}</li>
        </ul>
      </div>
    )}

  </div>
</div>

);
}
