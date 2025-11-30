import { prisma } from "../config";
import { Priority } from "@prisma/client";
import { logInfo } from "../utils/logger";

export const createTask = async (data: {
  title: string;
  description?: string;
  priority: Priority;
  start_date: Date;
  due_date: Date;
  folderId?: number;
  userId: number;
}) => {
  const task = await prisma.tasks.create({ data });
  logInfo(`Task created: ${task.id}`);
  return task;
};

export const getTasks = async (
  userId: number,
  filters?: { priority?: Priority; complete?: boolean; folderId?: number }
) => {
  return prisma.tasks.findMany({
    where: { userId, ...filters },
    orderBy: { due_date: "asc" },
  });
};

export const updateTask = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    priority: Priority;
    start_date: Date;
    due_date: Date;
    complete: boolean;
    folderId: number;
  }>
) => {
  const task = await prisma.tasks.update({ where: { id }, data });
  logInfo(`Task updated: ${id}`);
  return task;
};

export const deleteTask = async (id: number) => {
  await prisma.tasks.delete({ where: { id } });
  logInfo(`Task deleted: ${id}`);
};
