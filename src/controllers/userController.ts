import { Request, Response, NextFunction } from "express";
import { addUser, loginUser } from "../services/userService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function addUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const { email, password } = req.body;
		const newUserData = {
			email,
			password,
		};
		const addedUser = await addUser(newUserData);

		const token = jwt.sign(
			{ userId: addedUser._id, isAdmin: addedUser.isAdmin, email: addedUser.email },
			process.env.SECRET_KEY as jwt.Secret,
			{
				expiresIn: "1h",
			}
		);

		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 3600000,
		});

		return res.status(201).json({ message: "User added successfully." });
	} catch (error) {
		next(error);
	}
}

export async function loginUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const { email, password } = req.body;
		const userData = {
			email,
			password,
		};
		const connectedUser = await loginUser(userData);

		const token = jwt.sign(
			{ userId: connectedUser._id, isAdmin: connectedUser.isAdmin, email: connectedUser.email },
			process.env.SECRET_KEY as jwt.Secret,
			{
				expiresIn: "1h",
			}
		);

		res.cookie("token", token, { httpOnly: true });

		return res.status(200).json({ message: "User connected successfully." });
	} catch (error) {
		next(error);
	}
}
