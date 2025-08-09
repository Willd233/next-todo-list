// Dependencies.
import mongoose, { Schema, models, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, require: true },

    description: { type: String, require: true },

    completed: { type: Boolean, default: false },

    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);

export default Todo;
