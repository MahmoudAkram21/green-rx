import { Request, Response } from 'express';
export declare const createAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAppointmentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAppointmentsByPatient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAppointmentsByDoctor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cancelAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const confirmAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const completeAppointment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTodayAppointments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=appointment.controller.d.ts.map