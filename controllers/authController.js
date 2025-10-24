import { auth } from "../config/auth.js";
import usersModel from "../models/users.model.js";

// Signup Controller
const signupController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const data = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    await usersModel.create({ name, email, role });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Signin Controller
const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await auth.api.signInEmail({ body: { email, password } });

    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Export controllers at the bottom
export { signupController, signinController };
