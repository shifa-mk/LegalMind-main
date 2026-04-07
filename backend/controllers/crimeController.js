import fs from "fs";

// ✅ Load JSON safely
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
    const { city } = req.body;

    // 🔴 Validation
    if (!city) {
      return res.status(400).json({ message: "City required" });
    }

    const state = cityToState[city.toLowerCase()];

    if (!state) {
      return res.status(400).json({ message: "City not supported" });
    }

    // ✅ Get rows from JSON
    const rows = crimeData.data;

    // 🔥 DEBUG (optional)
    console.log("FIRST ROW:", rows[0]);

    // ✅ Find matching state safely
    const stateRow = rows.find(row =>
      String(row[1]).toLowerCase().includes(state.toLowerCase())
    );

    console.log("FOUND STATE:", stateRow);

    if (!stateRow) {
      return res.status(404).json({ message: "No data found" });
    }

    // ✅ Extract year-wise data safely
    const cases = {
      "2020": Number(stateRow[2]) || 0,
      "2021": Number(stateRow[3]) || 0,
      "2022": Number(stateRow[4]) || 0
    };

    // ✅ Final response
    return res.json({
      state,
      city,
      cases
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
