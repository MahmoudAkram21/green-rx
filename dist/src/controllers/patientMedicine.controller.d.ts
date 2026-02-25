import { Request, Response, NextFunction } from 'express';
export declare const getPatientMedicines: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPatientMedicineById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addPatientMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const addPatientMedicineByImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatePatientMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePatientMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyPatientMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUnverifiedMedicines: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=patientMedicine.controller.d.ts.map