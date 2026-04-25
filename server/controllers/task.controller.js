import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const createTask = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create(
      [
        {
          title,
          description,
          status,
          priority,
          dueDate,
          user: req.user.id,
        },
      ],
      { session },
    );

    if (session.inTransaction()) {
      await session.commitTransaction();
    }
    await session.endSession();
    const taskCreated = {
      title: task[0].title,
      description: task[0].description,
      status: task[0].status,
      priority: task[0].priority,
      dueDate: task[0].dueDate,
      user: task[0].user,
    };
    return res
      .status(201)
      .json({ success: true, message: "Task created", task: taskCreated });
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    await session.endSession();
    next(err);
  }
};
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).select("-user -__v");

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved",
      userId: req.user.id,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to get task" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Task retrieved", task });
  } catch (err) {
    next(err);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const allowedUpdates = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
    ];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updates,
      { returnDocument: "after", runValidators: true },
    ).select("-user -__v");
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Task updated",
      task: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};
