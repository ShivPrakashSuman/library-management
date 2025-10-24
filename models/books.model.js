import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  category: { type: String, required: true, trim: true },
  publishedYear: { type: Number, required: true },
  availableCopies: { type: Number, required: true, default: 1 },
  description : { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const booksModel = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default booksModel;
