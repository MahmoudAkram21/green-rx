import { Request, Response, NextFunction } from 'express';
declare class ExportController {
    private formatField;
    exportActiveSubstances(req: Request, res: Response, next: NextFunction): Promise<void>;
    exportTradeNames(req: Request, res: Response, next: NextFunction): Promise<void>;
    exportDiseases(_req: Request, res: Response, next: NextFunction): Promise<void>;
    exportCompanies(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getExportHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: ExportController;
export default _default;
//# sourceMappingURL=export.controller.d.ts.map