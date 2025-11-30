import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createController,
  getAllController,
  getTasksController,
  shareController,
  removeShareController,
  searchUsersController,
} from "../controllers/folder.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createController);
router.get("/", getAllController);
router.get("/:id/tasks", getTasksController);
router.post("/:id/share", shareController);
router.delete("/:id/share/:userId", removeShareController);
router.get("/search-users", searchUsersController); // Untuk share screen search

export default router;
