import { Request, Response } from 'express';
export declare const createAllergy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllergiesByPatient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllergyById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateAllergy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAllergy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const checkMedicineAllergies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCriticalAllergies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=allergy.controller.d.ts.map