import { prisma } from "../config";
import bcrypt from "bcryptjs";
import { logInfo } from "../utils/logger";

export const updateUser = async (
  id: number,
  data: { email?: string; username?: string; password?: string }
) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  logInfo(`User updated: ${id}`);
  return user;
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id } });
  logInfo(`User deleted: ${id}`);
};
