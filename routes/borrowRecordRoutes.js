import express from "express";
import BorrowRecordController from "../controllers/borrowRecordController.js";

const router = express.Router();

router.get("/get", BorrowRecordController.get);
router.post("/add", BorrowRecordController.add);
router.put("/edit", BorrowRecordController.edit);
router.delete("/delete", BorrowRecordController.deleteBorrow);

export default router;
