import chefsMockData from "../mockData/data/chefs";
import { chef } from "../mockData/data/types";
import { filterChefs } from "../utils";

export async function getAllChefs() {
	try {
		const allChefs = chefsMockData;
		// const filteredChefs = filterChefs({ allChefs, ...req.query });
		return allChefs;
	} catch (e) {
		console.log(e);
		throw Error("Error while getting all chefs");
	}
}

export async function getChefByID(id: number) {
	try {
		const allChefs = chefsMockData;
		return allChefs[0];
		// const { id } = req.params;
		// const allChefs = await getAllChefs();
		// const deletedChefIndex = allChefs.findIndex((chef) => chef.id === Number(id));

		// if (!deletedChefIndex) {
		// 	return res.status(404).json({ message: "Chef not found" });
		// }

		// allChefs.splice(deletedChefIndex, 1);
	} catch (e) {
		console.log(e);
		throw Error("Error while getting chef by id");
	}
}

export async function getChefOfTheWeek() {
	try {
		const allChefs = chefsMockData;
		const randomIndex = Math.floor(Math.random() * allChefs.length);
		const chefOfTheWeek = allChefs[randomIndex];
		return chefOfTheWeek;
	} catch (error: any) {
		throw Error('Error by getting the chef of the weak');
	}
}

export async function addChef(chef: chef) {
	try {
		return chef;
		//    const { name, image } = req.query;

		// 	if (!name || !image) {
		// 		return res.status(400).json({ message: "Both name and image are required." });
		// 	}

		// 	const allChefs = await getAllChefs();
		// 	const newChef = {
		// 		name: name as string,
		// 		image: image as string,
		// 		id: allChefs.length + 1,
		// 		summary: "",
		// 		popularity: 0,
		// 		restaurants: [],
		// 		isNew: false,
		// 	};
		// 	allChefs.push(newChef);
	} catch (e) {
		console.log(e);
		throw Error("Error while adding chef");
	}
}

export async function updateChefByID(id: number, chef: chef) {
	try {
		return chef;

		// const {id} = req.params;
		// const { name, image } = req.query;
		// const allChefs = await getAllChefs();

		// if (!name || !image || !id) {
		// 	return res.status(400).json({ message: "Both name and image are required." });
		// }

		// const chefToUpdateIndex = allChefs.findIndex((chef) => chef.id === Number(id));

		// if (chefToUpdateIndex === -1) {
		// 	return res.status(404).json({ message: "Chef not found." });
		// }

		// allChefs[chefToUpdateIndex].name = name as string;
		// allChefs[chefToUpdateIndex].image = image as string;
		// return allChefs;
	} catch (e) {
		console.log(e);
		throw Error("Error while updating chef by id");
	}
}

export async function deleteChefByID(id: number) {
	try {
		return id;
	} catch (e) {
		console.log(e);
		throw Error("Error while deleting chef by id");
	}
}
