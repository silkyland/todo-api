import { Request, Response } from "express";
import { getDatabase } from "../config/database";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, color } = req.body;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const result = await db.run(
      "INSERT INTO categories (name, color, user_id) VALUES (?, ?, ?)",
      [name, color, userId]
    );

    res.status(201).json({ id: result.lastID, name, color });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const categories = await db.all(
      "SELECT * FROM categories WHERE user_id = ?",
      [userId]
    );
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const result = await db.run(
      "UPDATE categories SET name = ?, color = ? WHERE id = ? AND user_id = ?",
      [name, color, id, userId]
    );

    if (result.changes === 0) {
      res.status(404).json({ error: "Category not found or not authorized" });
      return;
    }

    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const db = await getDatabase();

    const result = await db.run(
      "DELETE FROM categories WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.changes === 0) {
      res.status(404).json({ error: "Category not found or not authorized" });
      return;
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
