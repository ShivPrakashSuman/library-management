import express from "express";
import subscriptionController from "../controllers/subscriptionControlller.js";

const router = express.Router();

router.get("/get", subscriptionController.get);
router.post("/add", subscriptionController.add);
router.put("/edit", subscriptionController.edit);
router.delete("/delete", subscriptionController.deleteSubscription);

export default router;
