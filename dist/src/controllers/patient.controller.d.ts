import { Request, Response, NextFunction } from 'express';
export declare const createOrUpdatePatient: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addMedicalHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMedicalHistories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addFamilyHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateLifestyle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addAllergy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteAllergy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addChildProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getChildProfiles: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteChildProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=patient.controller.d.ts.map