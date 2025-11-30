import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { logError } from "../utils/logger";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as {id: number};
        (req as any).user = {id: decoded.id};
        next()
    } catch (error) {
        logError((error as Error).message);
        res.status(401).json({error: 'Unauthorized'});     
    }
}