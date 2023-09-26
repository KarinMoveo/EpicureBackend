import { user } from "../shared/types";
import User from "../models/User";


export async function addUser(newUserData: user) {
	const newUser = new User(newUserData);
	const savedUser = await newUser.save();
	return savedUser;
}

