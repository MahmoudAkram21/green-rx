import { Request, Response, NextFunction } from 'express';
interface ValidationSchema {
    validate: (data: any) => {
        error?: {
            details: Array<{
                message: string;
            }>;
        };
    };
}
declare const validateRequest: (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map