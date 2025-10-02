import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validateSignupData } from "../validator/signupValidator.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

dotenv.config();

const authRouter = express.Router();

//check login status
authRouter.get("/status", (req, res) => {
    console.log("Check login status in authRoutes, req.user:", req.user);

    
    if (req.user) {
        res.json({ isLoggedIn: true, user: req.user });
    } else {
        // console.log("No valid user found in auth check");
        res.json({ isLoggedIn: false, user: null });
    }
});

// User Signup
authRouter.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Signup attempt at backend:", req.body);
    try {

        // Validate input data
        const validation = validateSignupData({ username, email, password });
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });


        await newUser.save();

    
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// User Login
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        // Generate JWT token 
        const token = user.getJwt();

      
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",

        });


        res.status(200).json({  message: "Login successful", user: { id: user._id, username: user.username, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


//update password
//reset password

// User Logout
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});





export default authRouter;

