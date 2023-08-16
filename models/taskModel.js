import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Name is required!'],
      minLength: [3, 'Name must be at least 3 characters long!'],
      maxLength: [20, 'Name must be less than 20 characters long!'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
