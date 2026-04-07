import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const SectionDetails = () => {
  const { id } = useParams();

  const [crimeData, setCrimeData] = useState(null);
  const [selectedLawType, setSelectedLawType] = useState("IPC");
  const [sections, setSections] = useState([]);
  const [city, setCity] = useState("Mumbai"); // dynamic GPS later

  // ✅ Fetch sections
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get("/api/sections");
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    fetchSections();
  }, []);

  // ✅ Get city from GPS (optional but dynamic)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await geo.json();

          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village;

          if (detectedCity) {
            setCity(detectedCity);
          }

          console.log("📍 DETECTED CITY:", detectedCity);
        } catch (err) {
          console.log("GPS error:", err);
        }
      },
      () => {
        console.log("GPS permission denied");
      }
    );
  }, []);

  // 🔥 MAIN FETCH FUNCTION
  const fetchCrime = async () => {
    try {
      const currentSection = sections.find((s) => s._id === id);

      if (!currentSection) {
        console.log("❌ Section not found yet");
        return;
      }

      const payload = {
        city,
        section: currentSection.sectionNumber, // ✅ IMPORTANT FIX
        lawType: selectedLawType               // ✅ IMPORTANT FIX
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

  // ✅ Trigger when everything ready
  useEffect(() => {
    if (sections.length > 0 && city) {
      fetchCrime();
    }
  }, [id, selectedLawType, sections, city]);

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

      {/* 📊 DATA */}
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
