import { Request, Response, NextFunction } from "express";
declare class ImportController {
    importActiveSubstances(req: Request, res: Response, _next: NextFunction): Promise<void>;
    importEntity(req: Request, res: Response, next: NextFunction): Promise<void>;
    getImportHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
    private parseArrayField;
    private getFieldValue;
    private mapSideEffectField;
}
declare const _default: ImportController;
export default _default;
//# sourceMappingURL=import.controller.d.ts.map