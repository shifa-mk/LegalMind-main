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

    // ✅ Base data
    let cases = {
      "2020": Number(stateRow[2]) || 0,
      "2021": Number(stateRow[3]) || 0,
      "2022": Number(stateRow[4]) || 0
    };

    // 🔥 LAW TYPE FACTOR
    let factor = 1;

    if (lawType) {
      switch (lawType.toLowerCase()) {
        case "ipc":
          factor = 1;
          break;
        case "ndps act":
          factor = 0.6;
          break;
        case "pocso":
        case "pocso act":
          factor = 0.4;
          break;
        case "crpc":
          factor = 0.3;
          break;
        case "it act":
          factor = 0.2;
          break;
        case "arms act":
          factor = 0.5;
          break;
        case "motor vehicles act":
          factor = 0.7;
          break;
        default:
          factor = 0.8;
      }
    }

    // 🔥 SECTION FACTOR
    if (section) {
      const sectionFactor = (parseInt(section) % 7) / 10 + 0.7;
      factor *= sectionFactor;
    }

    // 🔥 APPLY FACTOR
    cases = {
      "2020": Math.floor(cases["2020"] * factor),
      "2021": Math.floor(cases["2021"] * factor),
      "2022": Math.floor(cases["2022"] * factor)
    };

    console.log("CITY:", city);
    console.log("SECTION:", section);
    console.log("LAW TYPE:", lawType);

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
