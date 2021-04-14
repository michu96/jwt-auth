import mongoose, { Document, Model } from "mongoose";
import userValid from "../../../shared/userSchema";

const userSchema = new mongoose.Schema(userValid);

export interface IUser {
  email: string;
  username: string;
  password: string;
}

export interface UserDocument extends IUser, Document {}

export default mongoose.model<UserDocument, Model<UserDocument>>(
  "User",
  userSchema
);
