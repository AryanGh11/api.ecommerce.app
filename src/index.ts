import dotenv from "dotenv";
import router from "./routes";
import express from "express";
import mongoose from "mongoose";
import "./extensions";

dotenv.config();

const app = express();
const PORT = 3002;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
if (!process.env.MONGO_URL) throw new Error("MONGO_URL is not defined");
const mongoUrl = process.env.MONGO_URL;
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

// Init routes
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
