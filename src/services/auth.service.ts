import { prisma } from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { logInfo, logError } from "../utils/logger";

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });
    logInfo(`User registered: ${user.id}`);
    return user;
  } catch (error) {
    logError("Registration error", error as Error);
    throw new Error("User creation failed");
  }
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: "1d",
  });
  logInfo(`User logged in: ${user.id}`);
  return { token, user };
};
