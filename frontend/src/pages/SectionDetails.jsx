import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const SectionDetails = () => {
  const { id } = useParams();

  const [crimeData, setCrimeData] = useState(null);
  const [selectedLawType, setSelectedLawType] = useState("IPC");

  // ✅ GET CITY (dynamic or fallback)
  const getCity = () => {
    return "Navi Mumbai"; // you can later replace with GPS
  };

  const fetchCrime = async () => {
    try {
      const city = getCity();

      // 🔥 IMPORTANT FIX HERE
      const payload = {
        city: city,
        section: id,                 // ✅ MUST SEND
        lawType: selectedLawType     // ✅ MUST SEND
      };

      console.log("🚀 SENDING:", payload);

      const res = await api.post("/api/crime/crime-data", payload);

      console.log("✅ RESPONSE:", res.data);

      setCrimeData(res.data);

    } catch (err) {
      console.error("❌ ERROR:", err);
    }
  };

  // ✅ REFETCH when section OR dropdown changes
  useEffect(() => {
    if (id) {
      fetchCrime();
    }
  }, [id, selectedLawType]);

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
        <div style={{
          marginTop: "20px",
          background: "#f5f5dc",
          padding: "15px",
          borderRadius: "10px",
          width: "300px"
        }}>
          <h3>
            📊 Crime Data ({crimeData.city})
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
