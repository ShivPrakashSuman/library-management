import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  features: { type: Object }, 
  stripePriceId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const planModel = mongoose.models.Plan || mongoose.model("Plan", planSchema);
export default planModel;
