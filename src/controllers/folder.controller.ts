import { Request, Response } from "express";
import {
  createFolder,
  getOwnFolders,
  getSharedFolders,
  getTasksInFolder,
  shareFolder,
  removeShare,
  searchUsers,
  deleteFolder,
  removeShareBySelf,
} from "../services/folder.service";
import {
  createFolderSchema,
  shareFolderSchema,
  searchUserSchema,
} from "../utils/validators";

export const createController = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const parsed = createFolderSchema.parse(req.body);
  const data = {
    ...parsed,
    userId,
  };
  const folder = await createFolder(data);
  res.status(201).json(folder);
};

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

export const deleteFolderController = async (req: Request, res: Response) => {
  const folderId = parseInt(req.params.id);
  const userId = (req as any).user.id;

  await deleteFolder(folderId, userId);

  res.json({ message: "Folder deleted successfully" });
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

export const removeShareBySelfController = async (
  req: Request,
  res: Response
) => {
  const folderId = parseInt(req.params.id);
  const userId = (req as any).user.id; 

  await removeShareBySelf(folderId, userId);

  res.json({ message: "You have left the shared folder" });
};

export const searchUsersController = async (req: Request, res: Response) => {
  const { query } = searchUserSchema.parse(req.query);
  const users = await searchUsers(query);
  res.json(users);
};
