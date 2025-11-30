import { Request, Response } from "express";
import { register, login } from "../services/auth.service";
import { registerSchema, loginSchema } from "../utils/validators";

export const registerController = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const user = await register(data.email, data.username, data.password);
  res.status(201).json({ message: "User created", user });
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const { token, user } = await login(data.email, data.password);
    res.json({ token, user });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      throw error; // Error lain ke middleware (500)
    }
  }
};
