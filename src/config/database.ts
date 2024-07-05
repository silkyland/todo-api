import dotenv from "dotenv";
import path from "path";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

dotenv.config();

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private db: Database | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async getConnection(): Promise<Database> {
    if (!this.db) {
      this.db = await open({
        filename:
          process.env.DB_PATH || path.join(__dirname, "..", "..", "todo.db"),
        driver: sqlite3.Database,
      });

      await this.initDatabase();
    }
    return this.db;
  }

  private async initDatabase(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER,
        category_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);
  }

  public async closeConnection(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export const getDatabase = async (): Promise<Database> => {
  const connection = DatabaseConnection.getInstance();
  return connection.getConnection();
};

export const closeDatabase = async (): Promise<void> => {
  const connection = DatabaseConnection.getInstance();
  await connection.closeConnection();
};
