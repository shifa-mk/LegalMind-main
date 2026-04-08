const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

exports.getAggregatedStats = async (req, res) => {
    const stats = {};
    // Construct the absolute path to the CSV file
    const csvFilePath = path.join(__dirname, '../data/crime_dataset_india.csv');

    if (!fs.existsSync(csvFilePath)) {
        return res.status(404).json({ message: "CSV file not found in data folder" });
    }

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const city = row.City?.trim();
            const crime = row['Crime Description']?.trim();
            const solved = row['Case Closed']?.trim().toLowerCase() === 'yes';

            if (city && crime) {
                if (!stats[city]) stats[city] = {};
                if (!stats[city][crime]) stats[city][crime] = { solved: 0, unsolved: 0, total: 0 };

                stats[city][crime].total++;
                if (solved) {
                    stats[city][crime].solved++;
                } else {
                    stats[city][crime].unsolved++;
                }
            }
        })
        .on('end', () => {
            res.json({ success: true, data: stats });
        })
        .on('error', (err) => {
            res.status(500).json({ success: false, error: err.message });
        });
};