import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  updateController,
  deleteController,
} from "../controllers/user.controller";

const router = express.Router();

router.use(authMiddleware);

router.patch("/:id", updateController);
router.delete("/:id", deleteController);

export default router;
