import mongoose from "mongoose";

const borrowRecordSchema  = new mongoose.Schema({
  member_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Member" },
  book_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
  borrow_date: { type: Date, default: Date.now },
  return_date: { type: Date },
  status: { type: String, enum: ["borrowed", "returned", "late"], default: "borrowed" },
  createdAt: { type: Date, default: Date.now },
});

const borrowRecordModel = mongoose.models.BorrowRecord || mongoose.model("BorrowRecord", borrowRecordSchema);
export default borrowRecordModel;
