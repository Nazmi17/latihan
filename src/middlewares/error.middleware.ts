import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";
import { logError } from "../utils/logger";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    logError("Error occured", err);

    if (err instanceof ZodError) {
        return res.status(400).json({ error: err.message});
    }

    res.status(500).json({error: "Internal server error"})
}