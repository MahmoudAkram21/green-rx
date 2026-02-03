import { Request, Response } from 'express';
export declare const createPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPaymentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPaymentsBySubscription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllPayments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePaymentStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const processPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const refundPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=payment.controller.d.ts.map