import { Request, Response } from "express";
import {
  createFolder,
  getOwnFolders,
  getSharedFolders,
  getTasksInFolder,
  shareFolder,
  removeShare,
  searchUsers,
} from "../services/folder.service";
import {
  createFolderSchema,
  shareFolderSchema,
  searchUserSchema,
} from "../utils/validators";

export const createController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const parsed = createFolderSchema.parse(req.body); // Validasi req.body dulu (expect name dan description?)
  const data = {
    ...parsed,
    userId, // Tambah userId setelah parse
  };
  const folder = await createFolder(data);
  res.status(201).json(folder);
};

// Sisanya tetap sama
export const getAllController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const own = await getOwnFolders(userId);
  const shared = await getSharedFolders(userId);
  res.json({ own, shared });
};

export const getTasksController = async (req: Request, res: Response) => {
  const folderId = parseInt(req.params.id);
  const userId = (req as any).user.id;
  const tasks = await getTasksInFolder(folderId, userId);
  res.json(tasks);
};

export const shareController = async (req: Request, res: Response) => {
  const folderId = parseInt(req.params.id);
  const userId = (req as any).user.id;
  const { userId: shareUserId } = shareFolderSchema.parse(req.body);
  const share = await shareFolder(folderId, userId, shareUserId);
  res.json(share);
};

export const removeShareController = async (req: Request, res: Response) => {
  const folderId = parseInt(req.params.id);
  const userId = (req as any).user.id;
  const removeUserId = parseInt(req.params.userId);
  await removeShare(folderId, userId, removeUserId);
  res.json({ message: "Share removed" });
};

export const searchUsersController = async (req: Request, res: Response) => {
  const { query } = searchUserSchema.parse(req.query);
  const users = await searchUsers(query);
  res.json(users);
};
