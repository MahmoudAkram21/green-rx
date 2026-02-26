import { Request, Response, NextFunction } from 'express';
import { FamilyRelation } from '../../generated/client/client';

/** GET /family-relations — return family relation enum values for mobile dropdowns */
export const getFamilyRelations = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const relations = Object.values(FamilyRelation);
    res.json(relations);
  } catch (error) {
    next(error);
  }
};
