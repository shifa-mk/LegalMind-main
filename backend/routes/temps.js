import express from "express";
import { askAI,logFIR } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/ask",  askAI);
router.post("/generate-fir", authMiddleware, logFIR);

export default router;

