import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const API_KEYS = (process.env.API_KEYS || '').split(',');

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(401).json({ message: 'API key is missing' });
    }

    if (!API_KEYS.includes(apiKey)) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next();
};
