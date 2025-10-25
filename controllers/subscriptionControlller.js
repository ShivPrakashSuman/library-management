import SubscriptionModel from "../models/subscription.model.js";

// Get all or single subscription
const get = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    let subscriptions;

    if (subscriptionId) {
      subscriptions = await SubscriptionModel.findById(subscriptionId)
        .populate("user_id")
        .populate("plan_id");

      if (!subscriptions) {
        return res.status(404).json({ success: false, message: "Subscription not found" });
      }
    } else {
      subscriptions = await SubscriptionModel.find()
        .populate("user_id")
        .populate("plan_id")
        .sort({ start_date: -1 });
    }

    res.status(200).json({
      success: true,
      message: "Subscriptions retrieved successfully",
      data: subscriptions,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Add new subscription
const add = async (req, res) => {
  try {
    const { user_id, plan_id, start_date, end_date, status, stripe_subscription_id } = req.body;

    if (!user_id || !plan_id) {
      return res.status(400).json({ success: false, message: "User ID and Plan ID are required" });
    }

    const newSubscription = new SubscriptionModel({
      user_id,
      plan_id,
      start_date: start_date || Date.now(),
      end_date,
      status: status || "active",
      stripe_subscription_id,
    });

    await newSubscription.save();

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: newSubscription,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update subscription
const edit = async (req, res) => {
  try {
    const { subscriptionId, ...updateData } = req.body;
    if (!subscriptionId) {
      return res.status(400).json({ success: false, message: "Subscription ID is required" });
    }

    const updated = await SubscriptionModel.findByIdAndUpdate(subscriptionId, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete subscription
const deleteSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    if (!subscriptionId) {
      return res.status(400).json({ success: false, message: "Subscription ID is required" });
    }

    const deleted = await SubscriptionModel.findByIdAndDelete(subscriptionId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default { get, add, edit, deleteSubscription };
