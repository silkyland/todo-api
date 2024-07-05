import { Request, Response } from "express";
import { getDatabase } from "../config/database";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId } = req.body;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const result = await db.run(
      "INSERT INTO todos (title, description, user_id, category_id) VALUES (?, ?, ?, ?)",
      [title, description, userId, categoryId]
    );

    res.status(201).json({ id: result.lastID, title, description, categoryId });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const todos = await db.all(
      `
      SELECT todos.*, categories.name as category_name 
      FROM todos 
      LEFT JOIN categories ON todos.category_id = categories.id 
      WHERE todos.user_id = ?
    `,
      [userId]
    );

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted, categoryId } = req.body;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const result = await db.run(
      `
      UPDATE todos 
      SET title = ?, description = ?, is_completed = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND user_id = ?
    `,
      [title, description, isCompleted, categoryId, id, userId]
    );

    if (result.changes === 0) {
      res.status(404).json({ error: "Todo not found or not authorized" });
      return;
    }

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const result = await db.run(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.changes === 0) {
      res.status(404).json({ error: "Todo not found or not authorized" });
      return;
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const searchTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.query;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const todos = await db.all(
      `SELECT * FROM todos 
       WHERE user_id = ? AND (title LIKE ? OR description LIKE ?)`,
      [userId, `%${query}%`, `%${query}%`]
    );

    res.json(todos);
  } catch (error) {
    console.error("Search todos error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const filterTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, category } = req.query;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    let query = "SELECT * FROM todos WHERE user_id = ?";
    const params: any[] = [userId];

    if (status) {
      query += " AND is_completed = ?";
      params.push(status === "completed" ? 1 : 0);
    }

    if (category) {
      query += " AND category_id = ?";
      params.push(category);
    }

    const todos = await db.all(query, params);
    res.json(todos);
  } catch (error) {
    console.error("Filter todos error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
