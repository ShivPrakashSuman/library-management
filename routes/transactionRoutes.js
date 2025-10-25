import express from "express";
import transactionController from "../controllers/transactionControlller.js";

const router = express.Router();

router.get("/get", transactionController.get);
router.post("/add", transactionController.add);
router.delete("/delete", transactionController.deleteTransaction);

export default router;
