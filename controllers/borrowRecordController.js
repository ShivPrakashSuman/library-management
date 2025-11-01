import borrowRecordModel from "../models/borrowRecord.model.js";

const get = async (req, res) => {
  try {
    const { borrowId } = req.body;
    let records;

    if (borrowId) {
      records = await borrowRecordModel.findById(borrowId)
        .populate("member_id")
        .populate("book_id");

      if (!records)
        return res.status(404).json({ success: false, message: "Borrow record not found" });
    } else {
      records = await borrowRecordModel.find()
        .populate("member_id")
        .populate("book_id")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      message: "Borrow records retrieved successfully",
      data: records,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add new borrow record
const add = async (req, res) => {
  try {
    const { member_id, book_id, borrow_date, return_date, status } = req.body;

    if (!member_id || !book_id) return res.status(400).json({ success: false, message: "Member and Book are required" });

    const newRecord = new borrowRecordModel({
      member_id,
      book_id,
      borrow_date,
      return_date,
      status,
    });

    await newRecord.save();
    res.status(201).json({
      success: true,
      message: "Borrow record added successfully",
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Edit borrow record
const edit = async (req, res) => {
  try {
    const { borrowId, ...updateData } = req.body;

    if (!borrowId)
      return res.status(400).json({ success: false, message: "Borrow ID is required" });

    const updatedRecord = await borrowRecordModel.findByIdAndUpdate(borrowId, updateData, { new: true });

    if (!updatedRecord)
      return res.status(404).json({ success: false, message: "Borrow record not found" });

    res.status(200).json({
      success: true,
      message: "Borrow record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Borrow Record
const deleteBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;

    if (!borrowId)
      return res.status(400).json({ success: false, message: "Borrow ID is required" });

    const deletedRecord = await borrowRecordModel.findByIdAndDelete(borrowId);

    if (!deletedRecord)
      return res.status(404).json({ success: false, message: "Borrow record not found" });

    res.status(200).json({ success: true, message: "Borrow record deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default { get, add, edit, deleteBorrow };
