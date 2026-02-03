import { Request, Response } from 'express';
export declare const createConsultation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConsultationById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConsultationsByPatient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getConsultationsByDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateConsultation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteConsultation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUpcomingFollowUps: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=consultation.controller.d.ts.map