import { Request, Response, NextFunction } from 'express';
declare class PatientShareLinkController {
    generateShareLink(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSharedData(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientShareLinks(req: Request, res: Response, next: NextFunction): Promise<void>;
    revokeShareLink(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteShareLink(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateShareLink(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: PatientShareLinkController;
export default _default;
//# sourceMappingURL=patientShareLink.controller.d.ts.map