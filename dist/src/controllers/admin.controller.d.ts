import { Request, Response, NextFunction } from 'express';
declare class AdminController {
    getPendingDoctors(_req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    rejectDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    getStatistics(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: AdminController;
export default _default;
//# sourceMappingURL=admin.controller.d.ts.map