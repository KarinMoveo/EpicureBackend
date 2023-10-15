import { Request, Response, NextFunction } from "express";
import { addUser, loginUser } from "../services/userService";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * @api {post} /api/users/signup Create a new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiDescription Create a new user account with the provided email and password.
 *
 * @apiBody {String} email Email address for the new user.
 * @apiBody {String} password Password for the new user.
 *
 * @apiSuccess {String} message Success message indicating the user was added successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "User added successfully."
 *     }
 */

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

/**
 * @api {post} /api/users/login Login a user
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiDescription Log in a user with the provided email and password.
 *
 * @apiBody {String} email User's email address.
 * @apiBody {String} password User's password.
 *
 * @apiSuccess {String} message Success message indicating the user was connected successfully.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User connected successfully."
 *     }
 */

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

		return res.status(200).json({ message: "User connected successfully.", isAdmin:connectedUser.isAdmin });
	} catch (error) {
		next(error);
	}
}
