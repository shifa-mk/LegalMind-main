import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const SectionDetails = () => {
  const { id } = useParams();

  const [crimeData, setCrimeData] = useState(null);
  const [selectedLawType, setSelectedLawType] = useState("IPC");
  const [sectionNumber, setSectionNumber] = useState(null);

  // 🔥 STEP 1: Find sectionNumber from API
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await api.get("/api/sections"); // your sections API

        const found = res.data.find(sec => sec._id === id);

        console.log("FOUND SECTION:", found);

        if (found) {
          setSectionNumber(found.sectionNumber);
        }
      } catch (err) {
        console.error("Section fetch error:", err);
      }
    };

    fetchSection();
  }, [id]);

  // 🔥 STEP 2: Fetch crime data
  useEffect(() => {
    if (!sectionNumber) return;

    const fetchCrime = async () => {
      try {
        const city = "Mumbai";

        console.log("SENDING:", {
          city,
          section: sectionNumber,
          lawType: selectedLawType
        });

        const res = await api.post("/api/crime/crime-data", {
          city,
          section: sectionNumber, // ✅ FIXED
          lawType: selectedLawType
        });

        console.log("API RESPONSE:", res.data);

        setCrimeData(res.data);
      } catch (err) {
        console.error("Crime fetch error:", err);
      }
    };

    fetchCrime();
  }, [sectionNumber, selectedLawType]);

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔽 DROPDOWN */}
      <select
        value={selectedLawType}
        onChange={(e) => setSelectedLawType(e.target.value)}
      >
        <option value="IPC">IPC</option>
        <option value="NDPS Act">NDPS Act</option>
        <option value="POCSO">POCSO</option>
        <option value="CrPC">CrPC</option>
        <option value="IT Act">IT Act</option>
        <option value="Arms Act">Arms Act</option>
        <option value="Motor Vehicles Act">Motor Vehicles Act</option>
      </select>

      {/* 📊 DATA */}
      {crimeData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Crime Data ({crimeData.city}) - {crimeData.lawType}</h3>
          <p>2020: {crimeData.cases["2020"]}</p>
          <p>2021: {crimeData.cases["2021"]}</p>
          <p>2022: {crimeData.cases["2022"]}</p>
        </div>
      )}
    </div>
  );
};

export default SectionDetails;
