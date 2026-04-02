import express from "express";
import {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  searchSections,
  getSectionByNumber,
} from "../controllers/sectionControllers.js";

const router = express.Router();

// 1. Static/Search routes FIRST
router.get("/search", searchSections);
router.get("/number/:number", getSectionByNumber);

// 2. The All Sections route
router.get("/", getSections);

// 3. The ID route (This MUST be after /search)
router.get("/:id", getSectionById);

// 4. Admin routes
router.post("/", createSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

export default router;
