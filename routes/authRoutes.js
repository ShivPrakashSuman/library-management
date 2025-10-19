import express from "express";
import { auth } from "../lib/auth.js";
import usersModel from "../models/users.model.js";

const router = express.Router();

// Sign up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const data = await auth.api.signUpEmail({
      body: { name, email, password },
    });
    
     await usersModel.create({
      name,
      email,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Sign in
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await auth.api.signInEmail({ body: { email, password } });

    res.status(200).json({ success: true, message: "Signed in successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router; 
