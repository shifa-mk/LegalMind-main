import axios from "axios";

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

    if (!city) {
      return res.status(400).json({ message: "City required" });
    }

    const state = cityToState[city.toLowerCase()];

    if (!state) {
      return res.status(400).json({ message: "City not supported" });
    }

    // ✅ Call Data.gov API
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

    // ✅ Filter all records for that state
    const stateData = records.filter(
      (item) =>
        (item["state/ut"] || item.state_ut)?.toLowerCase() === state.toLowerCase()
    );

    if (!stateData.length) {
      return res.status(404).json({ message: "No data found" });
    }

    // ✅ Extract year-wise data
    const cases = {
      "2020": stateData.find(i => i.year === "2020")?.ipc_crimes || "N/A",
      "2021": stateData.find(i => i.year === "2021")?.ipc_crimes || "N/A",
      "2022": stateData.find(i => i.year === "2022")?.ipc_crimes || "N/A"
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
