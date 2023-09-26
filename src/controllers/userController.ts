import { Request, Response, NextFunction } from "express";
import { addUser } from "../services/userService";

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
