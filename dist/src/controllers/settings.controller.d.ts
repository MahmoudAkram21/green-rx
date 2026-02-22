import { Request, Response, NextFunction } from 'express';
/** GET /settings/logo - Public. Returns logo image or 404. */
export declare function getLogo(_req: Request, res: Response, next: NextFunction): Promise<void>;
/** POST /settings/logo - Admin only. Upload logo (multipart file "logo"). */
export declare function uploadLogo(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=settings.controller.d.ts.map