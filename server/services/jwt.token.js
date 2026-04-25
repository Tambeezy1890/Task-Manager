import jwt from "jsonwebtoken";
import { EXPIRES_IN, JWT_SECRET } from "../config/env.js";
export const GenerateToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, { expiresIn: EXPIRES_IN });
};
