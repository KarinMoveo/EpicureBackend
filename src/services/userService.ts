import { user } from "../shared/types";
import User from "../models/User";
import CustomError from "../shared/CustomError";
import bcrypt from "bcrypt";

export async function addUser(newUserData: user) {

	const existingUser = await User.findOne({ email: newUserData.email });

	if (existingUser) {
		throw new CustomError("Email is already in use", 409);
	}

	const newUser = new User(newUserData);
	const savedUser = await newUser.save();
	return savedUser;
}

export async function loginUser(loginData: user) {
	const { email, password } = loginData;
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		throw new CustomError("User not found", 404);
	}
	const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
	if (!isPasswordMatch) {
		throw new CustomError("Incorrect password", 401);
	}
	return existingUser;
}
