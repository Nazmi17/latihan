import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "rahasia",
    databaseUrl: process.env.DATABASE_URL   
}

export const prisma = new PrismaClient({
    log: ['query', 'error', 'info', 'warn'],
})