import express from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/get", bookController.get);
router.post("/add", bookController.add);
router.put("/edit", bookController.edit);
router.delete("/delete", bookController.deleteBook);
// router.put("/edit/:id", bookController.edit);
// router.delete("/delete/:id", bookController.deleteBook);
export default router;