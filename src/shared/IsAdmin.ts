import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";

interface MyJwtPayload {
	userId: string;
	isAdmin: boolean;
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;

	if (!token) {
		return next(new CustomError("Token not found", 401));
	}

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY as jwt.Secret) as MyJwtPayload;

		if (decodedToken.isAdmin !== true) {
			return next(new CustomError("Only admin users can access this route", 403));
		}

		next();
	} catch (error) {
		return next(new CustomError("Invalid token", 401));
	}
}
