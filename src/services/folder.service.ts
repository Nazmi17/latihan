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
    include: {
      tasks: true,
      sharedWith: {
        include: {
          user: {
            select: { id: true, username: true, email: true },
          },
        },
      },
    },
  });
};

  export const getSharedFolders = async (userId: number) => {
    return prisma.foldersShare
      .findMany({
        where: { userId },
        include: {
          folder: {
            include: {
              tasks: true,
              user: true, 
            },
          },
        },
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

export const deleteFolder = async (folderId: number, userId: number) => {
  const folder = await prisma.folders.findUnique({ where: { id: folderId } });

  if (!folder || folder.userId !== userId) {
    throw new Error(
      "Folder not found or you do not have permission to delete it"
    );
  }

  await prisma.folders.delete({
    where: { id: folderId },
  });

  logInfo(`Folder deleted: ${folderId} by user ${userId}`);
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

export const removeShareBySelf = async (folderId: number, userId: number) => {
  const result = await prisma.foldersShare.deleteMany({
    where: {
      folderId: folderId,
      userId: userId,
    },
  });

  if (result.count === 0) {
    throw new Error("Shared folder not found or you are not a participant");
  }

  logInfo(`User ${userId} left shared folder: ${folderId}`);
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
    where: {
      folderId_userId: { folderId, userId },
    },
  });
  return !!share;
}
