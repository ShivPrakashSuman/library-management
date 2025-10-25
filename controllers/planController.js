import planModel from "../models/plan.model.js";

const get = async (req, res) => {
  try {
    const { planId } = req.body;
    let plans;

    if (planId) {
      plans = await planModel.findById(planId);
      if (!plans) return res.status(404).json({ success: false, message: "Plan not found" });
    } else {
      plans = await planModel.find().sort({ createdAt: -1 });
    }

    res.status(200).json({ success: true, message: "Plans retrieved successfully", data: plans });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add new plan
const add = async (req, res) => {
  try {
    const { name, price, features, stripePriceId } = req.body;
    if (!name || !price) return res.status(400).json({ success: false, message: "Name and Price are required" });

    const newPlan = new planModel({ name, price, features, stripePriceId });
    await newPlan.save();

    res.status(201).json({ success: true, message: "Plan added successfully", data: newPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Edit plan
const edit = async (req, res) => {
  try {
    const { planId, ...updateData } = req.body;
    if (!planId) return res.status(400).json({ success: false, message: "Plan ID is required" });

    const updatedPlan = await planModel.findByIdAndUpdate(planId, updateData, { new: true });
    if (!updatedPlan) return res.status(404).json({ success: false, message: "Plan not found" });

    res.status(200).json({ success: true, message: "Plan updated successfully", data: updatedPlan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete plan
const deletePlan = async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) return res.status(400).json({ success: false, message: "Plan ID is required" });

    const deletedPlan = await planModel.findByIdAndDelete(planId);
    if (!deletedPlan) return res.status(404).json({ success: false, message: "Plan not found" });

    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default { get, add, edit, deletePlan };
