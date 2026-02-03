import { Request, Response, NextFunction } from 'express';
declare class DiseaseWarningRuleController {
    getWarningRulesForDisease(req: Request, res: Response, next: NextFunction): Promise<void>;
    createWarningRule(req: Request, res: Response, next: NextFunction): Promise<void>;
    getWarningRuleById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateWarningRule(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteWarningRule(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllWarningRules(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: DiseaseWarningRuleController;
export default _default;
//# sourceMappingURL=diseaseWarningRule.controller.d.ts.map