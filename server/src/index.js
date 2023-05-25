import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "../router/userRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
//routes
app.use("/auth", userRouter);

// connecting mongoose
mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
//server

const port = 3001;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
