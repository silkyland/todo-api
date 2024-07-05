import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface TokenPayload {
  userId: number;
  username: string;
}

class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "your_jwt_secret";
    this.expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  }

  generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id,
      username: user.username,
    };

    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}

export const jwtService = new JwtService();
