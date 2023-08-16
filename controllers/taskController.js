import Task from '../models/taskModel.js';
import catchAsync from '../middleware/catchAsync.js';
import { createCustomError } from '../error/customError.js';
const createTask = catchAsync(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Task created successfully!',
    task,
  });
});

const getTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    status: 'success',
    message: 'Tasks fetched successfully!',
    results: tasks.length,
    tasks,
  });
});

const getTaskById = catchAsync(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findById({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Task fetched successfully!',
    task,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, { new: true });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    throw new Error('Task not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
