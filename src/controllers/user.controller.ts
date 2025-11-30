import { type Request, type Response } from "express";
import { updateUser, deleteUser } from "../services/user.service";
import { updateUserSchema } from "../utils/validators";

export const updateController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id !== (req as any).user.id)
    return res.status(403).json({ error: "Access denied" });
  const data = updateUserSchema.parse(req.body);
  const updated = await updateUser(id, data);
  res.json(updated);
};

export const deleteController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id !== (req as any).user.id)
    return res.status(403).json({ error: "Access denied" });
  await deleteUser(id);
  res.json({ message: "User deleted" });
};
