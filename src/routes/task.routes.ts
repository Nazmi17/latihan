import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createController,
  getAllController,
  updateController,
  deleteController,
} from "../controllers/task.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createController);
router.get("/", getAllController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

export default router;
