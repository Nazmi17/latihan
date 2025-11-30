-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "Priority" NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "start_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "folderID" INTEGER,
    "userID" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userID" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoldersShare" (
    "id" SERIAL NOT NULL,
    "folderID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoldersShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "Tasks_folderID_idx" ON "Tasks"("folderID");

-- CreateIndex
CREATE INDEX "Tasks_userID_idx" ON "Tasks"("userID");

-- CreateIndex
CREATE INDEX "Tasks_priority_idx" ON "Tasks"("priority");

-- CreateIndex
CREATE INDEX "Tasks_start_date_idx" ON "Tasks"("start_date");

-- CreateIndex
CREATE INDEX "Tasks_due_date_idx" ON "Tasks"("due_date");

-- CreateIndex
CREATE INDEX "Folders_name_idx" ON "Folders"("name");

-- CreateIndex
CREATE INDEX "Folders_userID_idx" ON "Folders"("userID");

-- CreateIndex
CREATE INDEX "FoldersShare_folderID_userID_idx" ON "FoldersShare"("folderID", "userID");

-- CreateIndex
CREATE INDEX "FoldersShare_folderID_idx" ON "FoldersShare"("folderID");

-- CreateIndex
CREATE INDEX "FoldersShare_userID_idx" ON "FoldersShare"("userID");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersShare" ADD CONSTRAINT "FoldersShare_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersShare" ADD CONSTRAINT "FoldersShare_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
