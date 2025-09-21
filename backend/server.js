import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import journalRouter from "./routes/journalRoutes.js";

// Middleware to protect routes
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config(); // Load environment variables


const app = express();

// Parse incoming JSON and cookies
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/auth", authRouter);
app.use("/journal", authenticateToken, journalRouter);



connectDB().then(() => {

  console.log("Connected to the database");
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
});



