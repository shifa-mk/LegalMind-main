import fs from "fs";

const crimeData = JSON.parse(
  fs.readFileSync(new URL("../crimeData.json", import.meta.url))
);

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

    if (!city) {
      return res.status(400).json({ message: "City required" });
    }

    const state = cityToState[city.toLowerCase()];

    if (!state) {
      return res.status(400).json({ message: "City not supported" });
    }

    // 🔥 FIX: use data array (not records)
    const rows = crimeData.data;

    const stateRow = rows.find(row =>
      row[1]?.toLowerCase().includes(state.toLowerCase())
    );

    if (!stateRow) {
      return res.status(404).json({ message: "No data found" });
    }

    const cases = {
      "2020": stateRow[2],
      "2021": stateRow[3],
      "2022": stateRow[4]
    };

    return res.json({
      state,
      city,
      cases
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
