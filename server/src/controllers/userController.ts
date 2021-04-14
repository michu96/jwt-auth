import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

const userController = {
  read: async (req: Request, res: Response) => {
    const token = req.cookies.authToken;
    if (!token) {
      res.json("No authorization token");
      return;
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as jwt.Secret,
      (err: any, user: any) => {
        if (err) {
          res.status(400).json("Authorization failed");
          return;
        }
        res.json(user);
        return;
      }
    );
  },

  create: async (req: Request, res: Response) => {
    const errors: {
      email?: string;
      username?: string;
      password?: string;
      rpassword?: string;
    } = {};

    const user: IUser = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const userModel = new User(user);

    if (req.body.password !== req.body.rpassword) {
      errors.rpassword = "Passwords do not match";
    }

    try {
      await userModel.validate();
    } catch (err) {
      for (const [key, value] of Object.entries(err.errors)) {
        const val = value as any;
        const k = key as "email" | "username" | "password" | "rpassword";
        errors[k] = val.message;
      }
    }

    if (Object.keys(errors).length > 0) {
      res.json(errors);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      userModel.password = hashedPassword;
      await userModel.save();
      res.json("ok");
      return;
    } catch (err) {
      if (err.code == 11000) {
        errors.email = "Email is already taken";
        res.status(400).json(errors);
        return;
      }
      res.status(500).json("Something went wrong");
      return;
    }
  },

  authenticate: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ username: req.body.username }).select(
        "username password"
      );
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.TOKEN_SECRET as jwt.Secret
          );
          res.setHeader("set-cookie", `authToken=${token};path=/`);
          res.status(200).json("User authenticated");
          return;
        }
      }
      res.status(400).json("Invalid username or password");
    } catch (err) {
      res.status(500).json("Something went wrong");
    }
  },
};

export default userController;
