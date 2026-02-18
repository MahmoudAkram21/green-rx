import { Request, Response, NextFunction } from 'express';
export declare function listPermissions(_req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function createPermission(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function deletePermission(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getRolePermissions(req: Request, res: Response, next: NextFunction): Promise<void>;
/** Add a permission to a role. Rejects if permission is adminOnly and role is not Admin/SuperAdmin. */
export declare function addPermissionToRole(req: Request, res: Response, next: NextFunction): Promise<void>;
/** Remove a permission from a role. */
export declare function removePermissionFromRole(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=permission.controller.d.ts.map