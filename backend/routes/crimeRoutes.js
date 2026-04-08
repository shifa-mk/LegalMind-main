import express from 'express';
const router = express.Router();

// 💡 Important: Use the .js extension in the import path
// Change 'controllers' to 'Controllers' to match your folder name
import { getCrimeStats } from '../controllers/crimeController.js';
router.get('/stats-by-section', getCrimeStats);

router.get("/test", (req, res) => {
  res.send("Crime route working ✅");
});

export default router;
