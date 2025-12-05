import { Priority } from "@prisma/client";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string; 
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  complete: boolean;
  start_date: Date;
  due_date: Date;
  folderId?: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
}

export interface Folder {
  id: number;
  name: string;
  description?: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
}

export interface FolderShare {
  id: number;
  folderId: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
}

export interface RequestWithUser extends Request {
  user?: { id: number }; 
}
