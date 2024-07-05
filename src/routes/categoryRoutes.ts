import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all category routes
router.use(authenticateToken);

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
