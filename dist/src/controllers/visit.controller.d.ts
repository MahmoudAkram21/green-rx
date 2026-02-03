import { Request, Response, NextFunction } from 'express';
declare class VisitController {
    createVisit(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientVisits(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDoctorVisits(req: Request, res: Response, next: NextFunction): Promise<void>;
    getVisit(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateVisit(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteVisit(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: VisitController;
export default _default;
//# sourceMappingURL=visit.controller.d.ts.map