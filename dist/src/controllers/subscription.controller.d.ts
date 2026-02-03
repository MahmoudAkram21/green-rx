import { Request, Response } from 'express';
export declare const createSubscription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSubscriptionByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllSubscriptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateSubscription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cancelSubscription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const renewSubscription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=subscription.controller.d.ts.map