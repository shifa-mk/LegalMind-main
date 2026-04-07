import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // adjust if your path is different

const SectionDetails = () => {
  const { id } = useParams();

  const [crimeData, setCrimeData] = useState(null);
  const [selectedLawType, setSelectedLawType] = useState("IPC"); // ✅ IMPORTANT

  // 🔥 Fetch crime data
  useEffect(() => {
    const fetchCrime = async () => {
      try {
        const city = "Mumbai"; // or dynamic later

        const res = await api.post("/api/crime/crime-data", {
          city,
          section: id,
          lawType: selectedLawType
        });

        console.log("API RESPONSE:", res.data);

        setCrimeData(res.data);
      } catch (err) {
        console.error("Crime fetch error:", err);
        setCrimeData(null);
      }
    };

    fetchCrime();
  }, [id, selectedLawType]); // ✅ VERY IMPORTANT

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔽 DROPDOWN */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedLawType}
          onChange={(e) => setSelectedLawType(e.target.value)}
        >
          <option>IPC</option>
          <option>NDPS Act</option>
          <option>POCSO</option>
          <option>CrPC</option>
          <option>IT Act</option>
          <option>Arms Act</option>
          <option>Motor Vehicles Act</option>
        </select>
      </div>

      {/* 📊 CRIME DATA UI */}
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
