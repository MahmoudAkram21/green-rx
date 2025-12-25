import { UserRole } from '../generated/client';
export interface TokenPayload {
    userId: number;
    email: string;
    role: UserRole;
}
export declare const generateAccessToken: (payload: TokenPayload) => string;
export declare const generateRefreshToken: (payload: TokenPayload) => string;
export declare const verifyAccessToken: (token: string) => TokenPayload;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.util.d.ts.map