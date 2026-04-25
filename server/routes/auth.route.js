import { Router } from "express";
import { getUser, login, signup } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user", protect, getUser);
authRoutes.get("/", () => null);

export default authRoutes;
