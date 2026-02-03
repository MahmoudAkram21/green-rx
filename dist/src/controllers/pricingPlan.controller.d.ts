import { Request, Response } from 'express';
export declare const getPricingPlans: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPricingPlanById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createPricingPlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePricingPlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePricingPlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDefaultPricingPlan: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=pricingPlan.controller.d.ts.map