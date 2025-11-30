/*
  Warnings:

  - You are about to drop the column `userID` on the `Folders` table. All the data in the column will be lost.
  - You are about to drop the column `folderID` on the `FoldersShare` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `FoldersShare` table. All the data in the column will be lost.
  - You are about to drop the column `folderID` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folderId,userId]` on the table `FoldersShare` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Folders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `folderId` to the `FoldersShare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `FoldersShare` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_userID_fkey";

-- DropForeignKey
ALTER TABLE "FoldersShare" DROP CONSTRAINT "FoldersShare_folderID_fkey";

-- DropForeignKey
ALTER TABLE "FoldersShare" DROP CONSTRAINT "FoldersShare_userID_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_folderID_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_userID_fkey";

-- DropIndex
DROP INDEX "Folders_userID_idx";

-- DropIndex
DROP INDEX "FoldersShare_folderID_idx";

-- DropIndex
DROP INDEX "FoldersShare_folderID_userID_idx";

-- DropIndex
DROP INDEX "FoldersShare_userID_idx";

-- DropIndex
DROP INDEX "Tasks_folderID_idx";

-- DropIndex
DROP INDEX "Tasks_userID_idx";

-- AlterTable
ALTER TABLE "Folders" DROP COLUMN "userID",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FoldersShare" DROP COLUMN "folderID",
DROP COLUMN "userID",
ADD COLUMN     "folderId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "folderID",
DROP COLUMN "userID",
ADD COLUMN     "folderId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Folders_userId_idx" ON "Folders"("userId");

-- CreateIndex
CREATE INDEX "FoldersShare_folderId_idx" ON "FoldersShare"("folderId");

-- CreateIndex
CREATE INDEX "FoldersShare_userId_idx" ON "FoldersShare"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FoldersShare_folderId_userId_key" ON "FoldersShare"("folderId", "userId");

-- CreateIndex
CREATE INDEX "Tasks_folderId_idx" ON "Tasks"("folderId");

-- CreateIndex
CREATE INDEX "Tasks_userId_idx" ON "Tasks"("userId");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersShare" ADD CONSTRAINT "FoldersShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersShare" ADD CONSTRAINT "FoldersShare_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
