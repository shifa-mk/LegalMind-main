import express from "express";
import { getCrimeData } from "../controllers/crimeController.js";

const router = express.Router();

router.post("/crime-data", getCrimeData);
router.get("/test", (req, res) => {
  res.send("Crime route working ✅");
});
console.log("Crime routes loaded ✅");
export default router;
