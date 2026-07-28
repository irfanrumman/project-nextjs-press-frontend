import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret) as JwtPayload;
        return {
            success: true,
            data: verifiedToken,
        };
    
    } catch (error: any) {
        console.error("Error verification failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};

export const jwtUtils = {
    verifyToken,
};