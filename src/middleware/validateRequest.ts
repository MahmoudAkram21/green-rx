import { Request, Response, NextFunction } from 'express';

interface ValidationSchema {
  validate: (data: any) => { error?: { details: Array<{ message: string }> } };
}

// Request validation middleware
const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    return next();
  };
};

export default validateRequest;

