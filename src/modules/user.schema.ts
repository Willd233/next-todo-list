import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email?: string;
  password?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, require: true, unique: true },

    email: { type: String, require: true, unique: true },

    password: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
