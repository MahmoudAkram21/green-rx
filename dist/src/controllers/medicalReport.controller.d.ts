import { Request, Response, NextFunction } from 'express';
declare class MedicalReportController {
    createReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientReports(req: Request, res: Response, next: NextFunction): Promise<void>;
    getReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteReport(req: Request, res: Response, next: NextFunction): Promise<void>;
    uploadReportFile(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: MedicalReportController;
export default _default;
//# sourceMappingURL=medicalReport.controller.d.ts.map