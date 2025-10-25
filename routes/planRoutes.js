import express from "express";
import planController from "../controllers/planController.js";

const router = express.Router();

router.post("/get", planController.get);
router.post("/add", planController.add);
router.put("/edit", planController.edit);
router.delete("/delete", planController.deletePlan);

export default router;
