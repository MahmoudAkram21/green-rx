import { Request, Response } from 'express';
export declare const addPatientDisease: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPatientDiseases: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getActivePatientDiseases: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePatientDiseaseStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePatientDisease: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=patientDisease.controller.d.ts.map