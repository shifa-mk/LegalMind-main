import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedStats = null; // Memory cache

const loadCrimeData = () => {
  return new Promise((resolve, reject) => {
    const stats = {};
    // Ensure this path exactly matches your folder structure
    const csvPath = path.join(__dirname, '../data/crime_dataset_india.csv');

    console.log("Reading CSV from:", csvPath);

    if (!fs.existsSync(csvPath)) {
        console.error("❌ CSV File not found at path!");
        return reject(new Error("File not found"));
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        const city = row.City?.trim();
        const crime = row['Crime Description']?.trim();
        const isClosed = row['Case Closed']?.trim().toLowerCase() === 'yes';

        if (city && crime) {
          if (!stats[city]) stats[city] = {};
          if (!stats[city][crime]) stats[city][crime] = { solved: 0, unsolved: 0, total: 0 };

          stats[city][crime].total++;
          isClosed ? stats[city][crime].solved++ : stats[city][crime].unsolved++;
        }
      })
      .on('end', () => {
        cachedStats = stats;
        console.log("✅ Crime CSV indexed and cached.");
        resolve(stats);
      })
      .on('error', (err) => {
        console.error("❌ CSV Parsing Error:", err);
        reject(err);
      });
  });
};

// Initial load on server start
loadCrimeData().catch(err => console.error("Initial load failed:", err));

// Change 'exports.getAggregatedStats' to 'export const getCrimeStats' 
// to match the import in your routes file!
export const getCrimeStats = async (req, res) => {
  if (cachedStats) {
    return res.json({ success: true, data: cachedStats });
  }
  
  try {
    const data = await loadCrimeData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load data" });
  }
};
