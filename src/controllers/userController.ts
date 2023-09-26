import { Request, Response, NextFunction } from "express";
import { addUser, loginUser } from "../services/userService";
import User from "../models/User";
import CustomError from "../shared/CustomError";
import { user } from "../shared/types";
import bcrypt from "bcrypt";

export async function addUserController(req: Request, res: Response, next: NextFunction) {
	try {
		const { email, password } = req.body;
		const newUserData = {
			email,
			password,
		};
		const addedUser = await addUser(newUserData);
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
		return res.status(200).json({ message: "User connected successfully." });
	} catch (error) {
		next(error);
	}
}
