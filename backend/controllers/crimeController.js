const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let cachedStats = null; // Memory cache

const loadCrimeData = () => {
  return new Promise((resolve, reject) => {
    const stats = {};
    const csvPath = path.join(__dirname, '../data/crime_dataset_india.csv');

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
      .on('error', reject);
  });
};

// Initial load on server start
loadCrimeData();

exports.getAggregatedStats = async (req, res) => {
  if (cachedStats) {
    return res.json({ success: true, data: cachedStats });
  }
  // Fallback if cache isn't ready
  const data = await loadCrimeData();
  res.json({ success: true, data });
};
