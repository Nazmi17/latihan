import {z} from "zod";

const Priority = z.enum(["HIGH", "MEDIUM", "LOW"]);

export const registerSchema = z.object({
    email: z.string().email({message: "Invalid email format "}),
    username: z.string().min(3, {message: "Username must be at least 3 characters"}).max(20, {message: "Username must not exceed 20 characters"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
});

export const loginSchema = z.object({
    email: z.string().email({message: "Invalid email format"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
});

export const updateUserSchema = z.object({
    email: z.string().email({message: "Invalid email format"}).optional(),
    username: z.string().min(3, {message: "Username must be at least 3 characters"}).max(20, {message: "Username must not exceed 20 characters"}).optional(),
    password: z.string().min(6, {message: "Passsword must be at least 6 characters"}).optional(),
});

export const createTaskSchema = z.object({
    title: z.string().min(3, {message: "Title must be at least 3 characters"}).max(20, {message: "Title must not exceed 20 characters"}),
    // description: z.string().min(3, {message: "Description must be at least 3 characters"}).max(100, {message: "Description must not exceed 100 characters"}).optional(),
    priority: Priority,
    start_date: z.string().refine((val) => !isNaN(Date.parse(val)), {message: "Invalid date format"}),
    due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {message: "Invalid date format"}),
    folderId: z.number().int().optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  complete: z.boolean().optional(),
});

export const createFolderSchema = z.object({
    name: z.string().min(3, {message: "Title must be at least 3 characters"}).max(20, {message: "Title must not exceed 20 characters"}),
    description: z.string().min(3, {message: "Description must be at least 3 characters"}).max(100, {message: "Description must not exceed 100 characters"}).optional(),
});

export const shareFolderSchema = z.object({
    userId: z.number().int({message: "Invalid user id"}),
});

export const searchUserSchema = z.object({
    query: z.string().min(1, {message: "Search Query is required"}),
});