import express from "express";
import { PORT } from "./config/env.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import connectToDataBase from "./config/mongodb.js";
import errorMiddleWare from "./middleware/error.middleware.js";
import taskRoutes from "./routes/task.route.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Server now Live");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  connectToDataBase();
});

app.use(errorMiddleWare);
