import booksModel from "../models/books.model.js";

// Get all books or specific book-------
const get = async (req, res) => {
   try {
      const { bookId } = req.body;
      let books;

      if (bookId) {
         books = await booksModel.findById(bookId);
         if (!books) {
            return res.status(404).json({ success: false, message: "Book not found" });
         }
      } else {
         books = await booksModel.find().sort({ createdAt: -1 }); // latest first
      }

      res.status(200).json({
         success: true,
         message: "Books retrieved successfully",
         data: books,
      });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};

// Add a new book------------------------
const add = async (req, res) => {
   try {
      const { title, author, isbn, category, publishedYear, copiesAvailable, description } = req.body;

      if (!title || !author) {
         return res.status(400).json({ success: false, message: "Title and Author are required" });
      }
      const newBook = new booksModel({
         title,
         author,
         isbn,
         category,
         publishedYear,
         availableCopies: copiesAvailable,
         description,
      });
      await newBook.save();

      res.status(201).json({
         success: true,
         message: "Book added successfully",
         data: newBook,
      });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};

// Edit book details---------------------
const edit = async (req, res) => {
   try {
      const { bookId, ...updateData } = req.body;
      if (!bookId) {
         return res.status(400).json({ success: false, message: "Book ID is required" });
      }

      const updatedBook = await booksModel.findByIdAndUpdate(bookId, updateData, { new: true });
      if (!updatedBook) {
         return res.status(404).json({ success: false, message: "Book not found" });
      }
      res.status(200).json({
         success: true,
         message: "Book updated successfully",
         data: updatedBook,
      });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};

// Delete a book-------------------------
const deleteBook = async (req, res) => {
   try {
      const { bookId } = req.body;
      if (!bookId) {
         return res.status(400).json({ success: false, message: "Book ID is required" });
      }
      const deletedBook = await booksModel.findByIdAndDelete(bookId);
      if (!deletedBook) {
         return res.status(404).json({ success: false, message: "Book not found" });
      }
      res.status(200).json({
         success: true,
         message: "Book deleted successfully",
      });
   } catch (error) {
      res.status(400).json({ success: false, message: error.message });
   }
};

// Export controllers at the bottom
export default { get, add, edit, deleteBook };