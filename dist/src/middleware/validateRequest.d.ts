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
declare const validateRequest: (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validateRequest;
//# sourceMappingURL=validateRequest.d.ts.map