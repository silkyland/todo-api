import express, { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  filterTodos,
  getTodos,
  searchTodos,
  updateTodo,
} from "../controllers/todoController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all todo routes
router.use(authenticateToken);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Implement search functionality
router.get("/search", searchTodos);

// Implement filter functionality
router.get("/filter", filterTodos);

// Error handling middleware
router.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
);

export default router;
