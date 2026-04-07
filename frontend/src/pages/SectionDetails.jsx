import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const SectionDetails = () => {
  const { id } = useParams();

  const [crimeData, setCrimeData] = useState(null);
  const [selectedLawType, setSelectedLawType] = useState("IPC");
  const [sections, setSections] = useState([]); // 🔥 STORE ALL SECTIONS

  // ✅ Fetch all sections once
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get("/api/sections"); // adjust if route different
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, []);

  // 🔥 MAIN FETCH FUNCTION
  const fetchCrime = async () => {
    try {
      const city = "Mumbai";

      // ✅ FIND CURRENT SECTION USING ID
      const currentSection = sections.find((s) => s._id === id);

      if (!currentSection) {
        console.log("❌ Section not found yet");
        return;
      }

      console.log("✅ SECTION NUMBER:", currentSection.sectionNumber);

      const res = await api.post("/api/crime/crime-data", {
        city,
        section: currentSection.sectionNumber, // ✅ FIXED HERE
        lawType: selectedLawType
      });

      console.log("🔥 API RESPONSE:", res.data);

      setCrimeData(res.data);
    } catch (err) {
      console.error("Crime fetch error:", err);
      setCrimeData(null);
    }
  };

  // 🔥 RUN WHEN ID / LAWTYPE / SECTIONS CHANGE
  useEffect(() => {
    if (sections.length > 0) {
      fetchCrime();
    }
  }, [id, selectedLawType, sections]);

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔽 DROPDOWN */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedLawType}
          onChange={(e) => {
            console.log("SELECTED LAW:", e.target.value);
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
            width: "300px"
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
