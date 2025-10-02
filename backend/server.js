import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import journalRouter from "./routes/journalRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import conversationRouter from "./routes/conversationRoutes.js";
import cors from "cors";

// Middleware to protect routes
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config(); // Load environment variables

const app = express();



// Parse incoming JSON and cookies
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

// CORS configuration

// app.options( cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   credentials: true,
// }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // ⬅️ not "*"
    credentials: true, // ⬅️ allow cookies
  })
);

app.use("/auth",authenticateToken, authRouter);
app.use("/journal", authenticateToken, journalRouter);
app.use("/chat", authenticateToken, chatRouter);
app.use("/conversation", authenticateToken, conversationRouter);



connectDB().then(() => {

  console.log("Connected to the database");
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
});



