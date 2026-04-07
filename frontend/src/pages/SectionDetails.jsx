import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const SectionDetails = () => {
  const { id } = useParams();

  const [crimeData, setCrimeData] = useState(null);
  const [selectedLawType, setSelectedLawType] = useState("IPC");
  const [sections, setSections] = useState([]);
  const [city, setCity] = useState("Navi Mumbai");

  // ✅ Fetch all sections
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get("/api/sections");
        console.log("📦 SECTIONS:", res.data);
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, []);

  // ✅ Fetch crime data
  const fetchCrime = async () => {
    try {
      if (sections.length === 0) {
        console.log("⏳ Sections not loaded yet");
        return;
      }

      // 🔥 FIXED MATCHING
      const currentSection = sections.find(
        (s) => String(s._id) === String(id)
      );

      console.log("🔍 CURRENT SECTION:", currentSection);

      if (!currentSection) {
        console.log("❌ Section not found");
        return;
      }

      const payload = {
        city,
        section: currentSection.sectionNumber, // ✅ FIX
        lawType: selectedLawType               // ✅ FIX
      };

      console.log("🚀 FINAL PAYLOAD:", payload);

      const res = await api.post("/api/crime/crime-data", payload);

      console.log("✅ RESPONSE:", res.data);

      setCrimeData(res.data);
    } catch (err) {
      console.error("❌ ERROR:", err);
      setCrimeData(null);
    }
  };

  // ✅ Trigger when ready
  useEffect(() => {
    fetchCrime();
  }, [id, selectedLawType, sections]);

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔽 DROPDOWN */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedLawType}
          onChange={(e) => {
            console.log("LAW SELECTED:", e.target.value);
            setSelectedLawType(e.target.value);
          }}
        >
          <option value="IPC">IPC</option>
          <option value="NDPS Act">NDPS Act</option>
          <option value="POCSO">POCSO</option>
          <option value="CrPC">CrPC</option>
          <option value="IT Act">IT Act</option>
          <option value="Arms Act">Arms Act</option>
          <option value="Motor Vehicles Act">Motor Vehicles Act</option>
        </select>
      </div>

      {/* 📊 CRIME DATA */}
      {crimeData && (
        <div
          style={{
            background: "#f5f5dc",
            padding: "15px",
            borderRadius: "10px",
            width: "320px"
          }}
        >
          <h3>
            📊 Crime Data ({crimeData.city}) - {crimeData.lawType}
          </h3>

          <p>2020: {crimeData.cases["2020"]}</p>
          <p>2021: {crimeData.cases["2021"]}</p>
          <p>2022: {crimeData.cases["2022"]}</p>
        </div>
      )}
    </div>
  );
};

export default SectionDetails;
