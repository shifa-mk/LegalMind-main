import crimeData from "../crimeData.json" assert { type: "json" };

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

    const records = crimeData.records;

    const stateRecord = records.find(
      (item) => item[0].toLowerCase() === state.toLowerCase()
    );

    if (!stateRecord) {
      return res.status(404).json({ message: "No data found" });
    }

    const cases = {
      "2020": stateRecord[1],
      "2021": stateRecord[2],
      "2022": stateRecord[3]
    };

    return res.json({
      city,
      state,
      cases
    });

  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
