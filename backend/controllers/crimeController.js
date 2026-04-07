import axios from "axios";

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

    const response = await axios.get(
      "https://api.data.gov.in/resource/15150682-a9ed-475d-b0e3-67b292e90a22",
      {
        params: {
          "api-key": process.env.DATA_GOV_API_KEY,
          format: "json",
          limit: 1000
        }
      }
    );

    const records = response.data.records;

    // 🔥 DEBUG FIRST RECORD
    console.log("SAMPLE RECORD:", records[0]);

    // ✅ Find state record (no year filtering yet)
    const stateRecord = records.find(
      item =>
        (item["state/ut"] || item.state_ut)?.toLowerCase() === state.toLowerCase()
    );

    if (!stateRecord) {
      return res.status(404).json({ message: "No data found" });
    }

    // ✅ IMPORTANT: Adjust based on actual keys
    const cases = {
      "2020": stateRecord["2020"] || stateRecord.year_2020 || "N/A",
      "2021": stateRecord["2021"] || stateRecord.year_2021 || "N/A",
      "2022": stateRecord["2022"] || stateRecord.year_2022 || "N/A"
    };

    return res.json({
      state,
      city,
      cases
    });

  } catch (error) {
    console.error("API ERROR:", error.message);
    return res.status(500).json({ message: "API failed" });
  }
};
