import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive", "cancelled"], default: "active" },
  stripeSubscriptionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const subscriptionModel =
  mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
export default subscriptionModel;
