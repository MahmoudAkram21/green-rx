import { Request, Response, NextFunction } from 'express';
declare class PrescriptionVersionController {
    getPrescriptionVersions(req: Request, res: Response, next: NextFunction): Promise<void>;
    getVersion(req: Request, res: Response, next: NextFunction): Promise<void>;
    createVersion(req: Request, res: Response, next: NextFunction): Promise<void>;
    compareVersions(req: Request, res: Response, next: NextFunction): Promise<void>;
    private calculateDifferences;
}
declare const _default: PrescriptionVersionController;
export default _default;
//# sourceMappingURL=prescriptionVersion.controller.d.ts.map