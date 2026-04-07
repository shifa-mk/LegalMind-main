import fs from "fs";

// ✅ Load JSON
const crimeData = JSON.parse(
  fs.readFileSync(new URL("../crimeData.json", import.meta.url))
);

// ✅ City → State mapping
const cityToState = {
  "mumbai": "Maharashtra",
  "navi mumbai": "Maharashtra",
  "pune": "Maharashtra",
  "delhi": "Delhi",
  "bangalore": "Karnataka"
};

export const getCrimeData = async (req, res) => {
  try {
    const { city, section, lawType } = req.body;

    if (!city) {
      return res.status(400).json({ message: "City required" });
    }

    const state = cityToState[city.toLowerCase()];

    if (!state) {
      return res.status(400).json({ message: "City not supported" });
    }

    const rows = crimeData.data;

    const stateRow = rows.find(row =>
      String(row[1]).toLowerCase().includes(state.toLowerCase())
    );

    if (!stateRow) {
      return res.status(404).json({ message: "No data found" });
    }

    // ✅ BASE DATA
    const baseCases = {
      "2020": Number(stateRow[2]) || 0,
      "2021": Number(stateRow[3]) || 0,
      "2022": Number(stateRow[4]) || 0
    };

    // 🔥 LAW TYPE WEIGHTS (STRONG DIFFERENCE)
    const lawWeights = {
      "ipc": 1,
      "ndps act": 0.5,
      "pocso": 0.3,
      "crpc": 0.2,
      "it act": 0.15,
      "arms act": 0.4,
      "motor vehicles act": 0.6
    };

    let factor = lawWeights[lawType?.toLowerCase()] || 0.5;

    // 🔥 SECTION FACTOR (STRONG DIFFERENCE)
    let sectionFactor = 1;

    if (section) {
      const num = parseInt(section);

      if (num < 100) sectionFactor = 0.2;
      else if (num < 200) sectionFactor = 0.4;
      else if (num < 300) sectionFactor = 0.6;
      else if (num < 400) sectionFactor = 0.8;
      else sectionFactor = 1;
    }

    factor *= sectionFactor;

    // 🔥 FINAL CALCULATION
    const cases = {
      "2020": Math.floor(baseCases["2020"] * factor),
      "2021": Math.floor(baseCases["2021"] * factor),
      "2022": Math.floor(baseCases["2022"] * factor)
    };
console.log("SECTION RECEIVED:", section);
    // 🔥 DEBUG
    console.log("CITY:", city);
    console.log("SECTION:", section);
    console.log("LAW TYPE:", lawType);
    console.log("FACTOR:", factor);

    return res.json({
      state,
      city,
      lawType,
      section,
      cases
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
