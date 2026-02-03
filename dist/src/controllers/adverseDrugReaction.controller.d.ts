import { Request, Response, NextFunction } from 'express';
declare class AdverseDrugReactionController {
    reportADR(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientADRs(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDrugADRs(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllADRs(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateADR(req: Request, res: Response, next: NextFunction): Promise<void>;
    getADRStatistics(_req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: AdverseDrugReactionController;
export default _default;
//# sourceMappingURL=adverseDrugReaction.controller.d.ts.map