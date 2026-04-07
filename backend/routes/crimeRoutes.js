import express from "express";
import { getCrimeData } from "../controllers/crimeController.js";

const router = express.Router();

router.post("/crime-data", getCrimeData);

export default router;
