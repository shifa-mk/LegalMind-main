import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables immediately
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,      // Double check these match your .env file
    api_secret: process.env.API_SECRET,
});

export default cloudinary;