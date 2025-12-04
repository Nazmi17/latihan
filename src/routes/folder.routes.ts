import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createController,
  getAllController,
  getTasksController,
  shareController,
  removeShareController,
  searchUsersController,
  deleteFolderController,
  removeShareBySelfController,
} from "../controllers/folder.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/search-users", searchUsersController);
router.post("/", createController);
router.get("/", getAllController);
router.delete("/:id", deleteFolderController); 
router.get("/:id/tasks", getTasksController);
router.post("/:id/share", shareController);
router.delete("/:id/leave", removeShareBySelfController);
router.delete("/:id/share/:userId", removeShareController); 

export default router;
