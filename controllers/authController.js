import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id, role) =>
   jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });

// -------------------- REGISTER --------------------
export const registerUser = async (req, res) => {
   try {
      const { name, email, mobile, password, role } = req.body;

      if (!email || !mobile || !password || !name)
         return res.status(400).json({ message: "All fields required" });

      const existingUser = await User.findOne({
         where: { [User.sequelize.Op.or]: [{ email }, { mobile }] },
      });

      if (existingUser)
         return res.status(400).json({ message: "Email or mobile already registered" });

      const user = await User.create({ name, email, mobile, password, role });

      const token = generateToken(user.id, user.role);
      res.status(201).json({
         id: user.id,
         name: user.name,
         email: user.email,
         mobile: user.mobile,
         role: user.role,
         token,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// -------------------- LOGIN --------------------
export const loginUser = async (req, res) => {
   try {
      const { emailOrMobile, password } = req.body;

      if (!emailOrMobile || !password)
         return res.status(400).json({ message: "Please enter credentials" });

      // find by either email or mobile
      const user = await User.findOne({
         where: {
            [User.sequelize.Op.or]: [
               { email: emailOrMobile },
               { mobile: emailOrMobile },
            ],
         },
      });

      if (!user)
         return res.status(401).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
         return res.status(401).json({ message: "Invalid password" });

      const token = generateToken(user.id, user.role);
      res.json({
         id: user.id,
         name: user.name,
         email: user.email,
         mobile: user.mobile,
         role: user.role,
         token,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
