// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Section from "./models/section.js";
import { pipeline } from "@xenova/transformers";
import cosineSimilarity from "cosine-similarity";

// Routes
import authRoutes from "./routes/authroutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";

// server.js
import aiRoutes from "./routes/temps.js";

// Mount it directly to the root or just /api


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({origin: ["http://localhost:3000", "http://192.168.0.117:3000"], credentials: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Preload embedder
let embedder;
(async () => {
  embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  console.log("✅ Embedding model loaded");

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/audit", auditRoutes);
// ... in your Express/Node.js route file (e.g., api/ai.js)

import { embedQuery, loadEmbedder } from './utils/embedding.js'; // Adjust path as needed


// You should call this once when your server starts
// loadEmbedder(); 

app.post("/api/ai/ask", async (req, res) => {
  
   console.log("🔥 AI ROUTE HIT");
  console.log("BODY:", req.body);
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Query is required." });
  }

  try {
    // MUST return 384-dim vector
    const queryVector = await embedQuery(query);
const matchedSections = await Section.aggregate([
  {
    $vectorSearch: {
      index: "vector_index",
      path: "embedding",
      queryVector,
      numCandidates: 100,
      limit: 5,
    },
  },
  {
   $project: {
    sectionNumber: 1,
    lawType: 1,
    sectionName: 1,
    description: 1,
    punishment: 1,
    investigationSteps: 1,
    requiredDocuments: 1,
    relatedSections: 1,
    referenceLink: 1,
    notesForPolice: 1,
    importantCases: 1,
    score: { $meta: "vectorSearchScore" },
  },
  },
]);

console.log("VECTOR RESULTS:", matchedSections);

    res.json({ matchedSections });

  } catch (error) {
    console.error("Vector search failed:", error);
    res.status(500).json({ message: "Server error during AI search." });
  }
});

// Health check
app.get("/", (req, res) => res.send({ status: "API is running" }));
