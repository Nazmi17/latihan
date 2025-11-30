import { prisma } from "../config";
import { logInfo } from "../utils/logger";

export const createFolder = async (data: {
  name: string;
  description?: string;
  userId: number;
}) => {
  const folder = await prisma.folders.create({ data });
  logInfo(`Folder created: ${folder.id}`);
  return folder;
};

export const getOwnFolders = async (userId: number) => {
  return prisma.folders.findMany({
    where: { userId },
    include: { tasks: true },
  });
};

export const getSharedFolders = async (userId: number) => {
  return prisma.foldersShare
    .findMany({
      where: { userId },
      include: { folder: { include: { tasks: true } } },
    })
    .then((shares) => shares.map((s) => s.folder));
};

export const getTasksInFolder = async (folderId: number, userId: number) => {
  const folder = await prisma.folders.findUnique({
    where: { id: folderId },
    include: { tasks: true },
  });
  if (
    !folder ||
    (folder.userId !== userId && !(await isShared(folderId, userId)))
  ) {
    throw new Error("Access denied");
  }
  return folder.tasks;
};

export const shareFolder = async (
  folderId: number,
  userId: number,
  shareUserId: number
) => {
  const folder = await prisma.folders.findUnique({ where: { id: folderId } });
  if (!folder || folder.userId !== userId) {
    throw new Error("Only owner can share");
  }
  const share = await prisma.foldersShare.create({
    data: { folderId, userId: shareUserId },
  });
  logInfo(`Folder shared: ${folderId} to ${shareUserId}`);
  return share;
};

export const removeShare = async (
  folderId: number,
  userId: number,
  removeUserId: number
) => {
  const folder = await prisma.folders.findUnique({ where: { id: folderId } });
  if (!folder || folder.userId !== userId) {
    throw new Error("Only owner can remove share");
  }
  await prisma.foldersShare.deleteMany({
    where: { folderId, userId: removeUserId },
  });
  logInfo(`Share removed: ${folderId} from ${removeUserId}`);
};

export const searchUsers = async (query: string) => {
  return prisma.user.findMany({
    where: {
      OR: [{ username: { contains: query } }, { email: { contains: query } }],
    },
    select: { id: true, username: true, email: true },
  });
};

async function isShared(folderId: number, userId: number) {
  const share = await prisma.foldersShare.findUnique({
    where: { folderId_userId: { folderId, userId } },
  });
  return !!share;
}
