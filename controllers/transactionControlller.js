import TransactionModel from "../models/transaction.model.js";

// Get transactions
const get = async (req, res) => {
  try {
    const { transactionId } = req.body;
    let transactions;

    if (transactionId) {
      transactions = await TransactionModel.findById(transactionId)
        .populate("user_id")
        .populate("subscription_id");
      if (!transactions) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }
    } else {
      transactions = await TransactionModel.find()
        .populate("user_id")
        .populate("subscription_id")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add transaction
const add = async (req, res) => {
  try {
    const { user_id, subscription_id, amount, status, payment_method, stripe_payment_id } = req.body;

    if (!user_id || !amount) {
      return res.status(400).json({ success: false, message: "User ID and amount are required" });
    }

    const newTransaction = new TransactionModel({
      user_id,
      subscription_id,
      amount,
      status: status || "success",
      payment_method: payment_method || "stripe",
      stripe_payment_id,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction recorded successfully",
      data: newTransaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }

    const deleted = await TransactionModel.findByIdAndDelete(transactionId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default { get, add, deleteTransaction };
