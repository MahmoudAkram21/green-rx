import { Request, Response, NextFunction } from 'express';
export declare const getAllSideEffects: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPendingSideEffects: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createSideEffect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateSideEffect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const approveSideEffect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const attachTradeNames: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const removeTradeName: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admin.sideEffects.controller.d.ts.map