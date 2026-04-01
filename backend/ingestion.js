// D:\legal\backend\seed.js (or ingestion.js)

import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./models/section.js"; // Adjust the path to your Section model if needed
import { pipeline } from "@xenova/transformers";

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Load sentence embedder
        const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
        console.log("✅ 768-D Model loaded");

        const sections = await Section.find({});
        console.log(`Embedding ${sections.length} sections...`);

        for (const s of sections) {
            // Combine relevant fields into a single text string for better context
            const text = `${s.sectionNumber} ${s.sectionName}. ${s.description}. ${s.lawType || ""}`;
            
            // Generate the correct 768-D vector
            const output = await embedder(text, { pooling: "mean", normalize: true });
            const correctVector = Array.from(output.data);
            
            // VERIFY AND SAVE
            console.log(`Saving vector for Section ${s.sectionNumber} with ${correctVector.length} dimensions`); 

            s.embedding = correctVector;
            await s.save();
        }

        console.log("🎉 All section embeddings regenerated with 768-D vectors!");
        process.exit(0);
    } catch (error) {
        console.error("❌ INGESTION SCRIPT FAILED:", error);
        process.exit(1);
    }
})();