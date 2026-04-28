import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

const taskRoutes = Router();

taskRoutes.post("/create-task", protect, createTask);
taskRoutes.get("/get-tasks", protect, getTasks);
taskRoutes.get("/get-task/:id", protect, getTask);
taskRoutes.patch("/update-task/:id", protect, updateTask);
taskRoutes.delete("/delete-task/:id", protect);

export default taskRoutes;
