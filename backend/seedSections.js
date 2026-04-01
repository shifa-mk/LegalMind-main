import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./models/section.js";
import sectionsData from "./sectionsData.js";


dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Delete old data
    await Section.deleteMany();
    console.log("🗑 Existing sections deleted");

    // Insert new data
    await Section.insertMany(sectionsData);
    console.log("✅ Sections inserted successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

seedData();
