import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrpyt from "bcrypt";
import { GenerateToken } from "../services/jwt.token.js";
export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({
        success: false,
        message: "Email,username and password are required",
      });
    }
    const userExist = await User.findOne({ email }).session(session);
    if (userExist) {
      await session.abortTransaction();
      await session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrpyt.hash(password, 10);
    const newUser = await User.create(
      [{ email, username, password: hashedPassword }],
      { session },
    );
    if (session.inTransaction()) {
      await session.commitTransaction();
    }
    await session.endSession();

    const user = {
      id: newUser[0]._id,
      email: newUser[0].email,
      username: newUser[0].username,
    };
    const token = GenerateToken({ user });
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    await session.endSession();
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userValidation = await User.findOne({ email });

    if (!userValidation) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrpyt.compare(password, userValidation.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = GenerateToken(userValidation);
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
    });

    const user = await User.findOne({ email }).select("-password");
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const token = req.user;
    const user = await User.findById(token.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved",
      user,
    });
  } catch (err) {
    next(err);
  }
};
