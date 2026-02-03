import { Request, Response, NextFunction } from 'express';
declare class MedicineSuggestionController {
    createSuggestion(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSuggestions(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSuggestionById(req: Request, res: Response, next: NextFunction): Promise<void>;
    reviewSuggestion(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteSuggestion(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: MedicineSuggestionController;
export default _default;
//# sourceMappingURL=medicineSuggestion.controller.d.ts.map