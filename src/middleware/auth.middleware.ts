import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt.util';
import { UserRole } from '../../generated/client/client';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized: No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = verifyAccessToken(token);

            // Optional: Check if user still exists and is active
            // const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            // if (!user || !user.isActive) {
            //   return res.status(401).json({ error: 'Unauthorized: User not found or inactive' });
            // }

            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }
    } catch (error) {
        next(error);
    }
};

export const authorize = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized: Not authenticated' });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            return;
        }

        next();
    };
};
