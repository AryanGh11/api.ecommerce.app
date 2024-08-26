import "./extensions";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import router from "./routes";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = 3002;

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://ecommerce-app-aryan.vercel.app",
  "http://localhost:3000",
];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));

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
  console.log(`Server is running on Port ${PORT}`);
});
