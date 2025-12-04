import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/task.service";
import { createTaskSchema, updateTaskSchema } from "../utils/validators";
import { Priority } from "@prisma/client";

export const createController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const parsed = createTaskSchema.parse(req.body); 
  const data = {
    ...parsed,
    start_date: new Date(parsed.start_date),
    due_date: new Date(parsed.due_date),
    userId,
  };
  const task = await createTask(data);
  res.status(201).json(task);
};

export const updateController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const parsed = updateTaskSchema.parse(req.body); 
  const data: any = { ...parsed }; 
  if (data.start_date) data.start_date = new Date(data.start_date as string);
  if (data.due_date) data.due_date = new Date(data.due_date as string);
  const task = await updateTask(id, data);
  res.json(task);
};


export const getAllController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const filters = {
    priority: req.query.priority as Priority,
    complete: req.query.complete === "true",
    folderId: req.query.folderId
      ? parseInt(req.query.folderId as string)
      : undefined,
  };
  const tasks = await getTasks(userId, filters);
  res.json(tasks);
};

export const deleteController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await deleteTask(id);
  res.json({ message: "Task deleted" });
};
