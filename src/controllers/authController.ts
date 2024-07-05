import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getDatabase } from "../config/database";
import { jwtService } from "../services/jwtService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;
    const db = await getDatabase();

    // Check if user already exists
    const existingUser = await db.get(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser) {
      res.status(400).json({ error: "Username or email already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const result = await db.run(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    res
      .status(201)
      .json({ message: "User registered successfully", userId: result.lastID });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const db = await getDatabase();

    // Find user
    const user = await db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (!user) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    // Generate JWT
    const token = jwtService.generateToken(user);

    res.json({ token, userId: user.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
