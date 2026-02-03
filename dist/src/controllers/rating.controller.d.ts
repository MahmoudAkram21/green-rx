import { Request, Response, NextFunction } from 'express';
declare class RatingController {
    createRating(req: Request, res: Response, next: NextFunction): Promise<void>;
    getDoctorRatings(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPharmacistRatings(req: Request, res: Response, next: NextFunction): Promise<void>;
    getPatientRatings(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteRating(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: RatingController;
export default _default;
//# sourceMappingURL=rating.controller.d.ts.map