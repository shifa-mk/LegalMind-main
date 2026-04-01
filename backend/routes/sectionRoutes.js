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

router.get("/search", searchSections);
router.get("/number/:number", getSectionByNumber);
router.get("/", getSections);
router.get("/:id", getSectionById);
router.post("/", createSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

export default router;

