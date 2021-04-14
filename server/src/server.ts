import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
require("dotenv").config();
const morgan = require("morgan");

mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);

app.listen(5000, () => console.log("Listening on port 5000...."));
