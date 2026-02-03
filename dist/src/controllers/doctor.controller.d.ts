import { Request, Response, NextFunction } from 'express';
export declare const createOrUpdateDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctorById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctorByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyDoctor: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllDoctors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const assignPatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getDoctorPatients: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const removePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=doctor.controller.d.ts.map