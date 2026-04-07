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

    const state = cityToState[city.toLowerCase()];

    if (!state) {
      return res.status(400).json({ message: "City not supported" });
    }

    const data = records.find(
      item => item.state_ut.toLowerCase() === state.toLowerCase()
    );

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    // ⚠️ adjust keys if needed after console log
    const cases = {
      "2020": data["2020"] || data.year_2020,
      "2021": data["2021"] || data.year_2021,
      "2022": data["2022"] || data.year_2022
    };

    res.json({
      state,
      city,
      cases
    });

  } catch (error) {
    console.error("API ERROR:", error.message);
    res.status(500).json({ message: "API failed" });
  }
};
