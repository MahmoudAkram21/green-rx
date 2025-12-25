import { Request, Response, NextFunction } from 'express';
interface PrismaError extends Error {
    code?: string;
    status?: number;
}
declare const errorHandler: (err: PrismaError, _req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>>;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map