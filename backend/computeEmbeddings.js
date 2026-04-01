import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./models/section.js";
import { pipeline } from "@xenova/transformers";

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB");

  // Load sentence embedder
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  console.log("✅ Model loaded");

  const sections = await Section.find({});
  console.log(`Embedding ${sections.length} sections...`);

  for (const s of sections) {
    const text = `${s.sectionNumber} ${s.sectionName}. ${s.description}. ${s.lawType || ""}`;
    const output = await embedder(text, { pooling: "mean", normalize: true });
    const vec = Array.from(output.data); // final 768-dimensional normalized vector
    s.embedding = vec;
    await s.save();
    console.log(`✅ Saved embedding for Section ${s.sectionNumber}`);
  }

  console.log("🎉 All section embeddings regenerated!");
  process.exit(0);
})();
