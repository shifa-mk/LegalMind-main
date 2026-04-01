

import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./models/section.js"; // path to your Section model
import { embedText } from "./utils/embedding.js";
import { sectionTags } from "./utils/sectionTags.js"; // adjust path

dotenv.config();

const MONGO_URL = process.env.MONGO_URI;

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const updateAll = async () => {
  try {
    for (const t of sectionTags) {
      const section = await Section.findOne({ sectionNumber: t.sectionNumber });
      if (!section) continue;

      section.tags = t.tags;
      const baseText = `${section.sectionNumber} ${section.sectionName} ${section.description} ${section.tags.join(" ")}`;
      section.embedding = await embedText(baseText);

      await section.save();
      console.log(`Updated section ${section.sectionNumber}`);
    }
    console.log("🎯 All sections updated!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateAll();
