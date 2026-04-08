const express = require('express');
const router = express.Router();
// Ensure the function name matches your controller (getCrimeStats or getCrimeData)
const { getCrimeStats } = require('../controllers/crime.controller');

// GET route for the frontend to fetch the CSV statistics
router.get('/stats-by-section', getCrimeStats);

// Test route to verify the backend is working
router.get("/test", (req, res) => {
  res.send("Crime route working ✅");
});

console.log("Crime routes loaded ✅");

module.exports = router;
