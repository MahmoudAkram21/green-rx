import { Request, Response } from 'express';
export declare const createPatientDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRelationshipsByPatient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRelationshipsByDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePatientDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const endRelationship: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRelationshipById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=patientDoctor.controller.d.ts.map