import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    res.json({ message: "User already exist" });
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await new UserModel({ username, password: hashedPass });
  await newUser.save();
  res.json({ message: "user created successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    res.json({ message: "Username Doesn't exist" });
  }
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) {
    res.json({ message: "Your password Doesn't match" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userID: user._id });
});
export { router as userRouter };
