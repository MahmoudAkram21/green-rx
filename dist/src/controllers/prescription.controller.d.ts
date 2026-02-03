import { Request, Response } from 'express';
export declare const createPrescription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createBatchPrescriptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPrescriptions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPrescriptionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePrescription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePrescription: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const acknowledgeDrugInteraction: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDrugInteractionAlerts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=prescription.controller.d.ts.map