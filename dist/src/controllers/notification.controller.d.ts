import { Request, Response, NextFunction } from 'express';
declare class NotificationController {
    createNotification(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserNotifications(req: Request, res: Response, next: NextFunction): Promise<void>;
    markAsRead(req: Request, res: Response, next: NextFunction): Promise<void>;
    markAllAsRead(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendAppointmentReminders(_req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: NotificationController;
export default _default;
//# sourceMappingURL=notification.controller.d.ts.map