import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import Book from "../models/Book.js";

const router = express.Router();

// Add Book (only admin or librarian)
router.post("/", protect, authorizeRoles("admin", "librarian"), async (req, res) => {
  const book = new Book(req.body);
  const saved = await book.save();
  res.json(saved);
});

// Get all books (everyone)
router.get("/", protect, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

export default router;
