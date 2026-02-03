import { Request, Response, NextFunction } from 'express';
declare class DrugInteractionAlertController {
    checkDrugSafety(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAlertsByPrescription(req: Request, res: Response, next: NextFunction): Promise<void>;
    acknowledgeByDoctor(req: Request, res: Response, next: NextFunction): Promise<void>;
    acknowledgeByPatient(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientAlerts(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: DrugInteractionAlertController;
export default _default;
//# sourceMappingURL=drugInteractionAlert.controller.d.ts.map