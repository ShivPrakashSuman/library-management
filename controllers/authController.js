import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import Joi from "joi";

// -------------------- REGISTER --------------------
const registerUser = async (req, res) => {
   let resp = { status: false, message: 'Oops Somethimg went wrong', data: null };
   const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().min(4).max(8).required(),
      confirmpassword: Joi.ref('password'),
      mobile: Joi.string().required(),
      role: Joi.string().required(),
   }).validate(req.body);
   if (schema.error) {
      resp.message = schema.error.details[0].message;
      return res.json(resp);
   }
   try {
      const { name, email, mobile, password, role } = schema.value;
      const existingUser = await User.findOne({
         where: { [Op.or]: [{ email }, { mobile }] }
      });
      if (existingUser) {
         resp.message = 'Email or mobile already registered';
         return res.json(resp);
      }

      const result = await User.create({ name, email, mobile, password, role });
      if (result) {
         resp.status = true;
         resp.message = 'Registered Successfully';
         resp.data = result;
      } else {
         resp.message = 'Not Record Registered';
      }
      return res.json(resp);
   } catch (e) {
      console.log('catch error', e);
      return res.json(resp);
   }
};

// -------------------- LOGIN --------------------
const loginUser = async (req, res) => {
   let resp = { status: false, message: 'Oops Somethimg went wrong', data: null };
   const schema = Joi.object({
      email: Joi.string().trim().email(),
      mobile: Joi.string(),
      password: Joi.string().min(4).max(8).required(),
   }).validate(req.body);
   if (schema.error) {
      resp.message = schema.error.details[0].message;
      return res.json(resp);
   }
   try {
      const { email, mobile, password } = schema.value;

      // find user by email or mobile
      const whereCondition = email ? { email: email.trim() } : { mobile: mobile.trim() };
      const userData = await User.findOne({ where: whereCondition });

      if (!userData) {
         resp.message = 'User not found';
         return res.json(resp);
      }

      const isMatch = await bcrypt.compare(password, userData.password);
      const token = generateToken(userData.id, userData.role);
      if (isMatch) {
         resp.status = true;
         resp.message = 'Login SuccessFull';
         resp.data = { user: userData, token: token };
      } else {
         resp.message = 'Invalid password';
      }
      return res.json(resp);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export { registerUser, loginUser };