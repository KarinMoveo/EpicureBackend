import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { MyJwtPayload } from "./types";
import CustomError from "./CustomError";


function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;

  try {
		jwt.verify(token, process.env.SECRET_KEY as jwt.Secret) as MyJwtPayload;
		next();
	} catch (error) {
    return next(new CustomError("Unauthorized", 401));
	}
}

export default authMiddleware;
