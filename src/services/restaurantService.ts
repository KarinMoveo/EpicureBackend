import { Types } from "mongoose";
import { restaurant } from "../shared/types";
import Restaurant from "../models/Restaurant";
import Dish from "../models/Dish";
import Chef from "../models/Chef";
import CustomError from "../shared/CustomError";

function convertBitwiseToRatings(bitwiseValue: number) {
	const ratings = [];
	if (bitwiseValue & 1) ratings.push(1);
	if (bitwiseValue & 2) ratings.push(2);
	if (bitwiseValue & 4) ratings.push(3);
	if (bitwiseValue & 8) ratings.push(4);
	if (bitwiseValue & 16) ratings.push(5);

	return ratings;
}

export async function getAllRestaurants(filterOptions: any) {
	const {
		page,
		perPage,
		minPrice = 12,
		maxPrice = 357,
		distance = 100,
		rating = 31,
		openingYear = 0,
		isOpenNow = 0,
	} = filterOptions;

	const pipeline = [];

	const popularityRatings = convertBitwiseToRatings(+rating);

	const currentDate = new Date();
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const formattedHours = hours < 10 ? `0${hours}` : hours;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const currentTime = `${formattedHours}:${formattedMinutes}`;

	pipeline.push({
		$match: {
			averagePrice: { $gte: +minPrice, $lte: +maxPrice },
			distance: { $lte: +distance },
			openingDate: { $gte: `${openingYear}-01-01` }, 
			popularity: { $in: popularityRatings },
			...(+isOpenNow && {
				$expr: {
					$and: [{ $gte: [currentTime, "$from"] }, { $lte: [currentTime, "$to"] }],
				},
			}), 
		},
	});


	const skip = (+page - 1) * +perPage;
	pipeline.push({ $skip: +skip });
	pipeline.push({ $limit: +perPage });

	const allRestaurants = await Restaurant.aggregate(pipeline);
	return allRestaurants;
}

export async function getPopularRestaurants() {
	const filter = { popularity: { $gte: 3 } };
	const popularRestaurants = await Restaurant.find(filter).populate("chef").limit(3);
	return popularRestaurants;
}

export async function getRestaurantById(restaurantId: string) {
	const restaurant = await Restaurant.findOne({ _id: restaurantId }).populate("chef").populate("dishes");

	if (!restaurant) {
		throw new CustomError("Restaurant not found", 404);
	}

	return restaurant;
}

export async function addRestaurant(newRestaurantData: restaurant) {
	const newRestaurant = new Restaurant(newRestaurantData);
	const savedRestaurant = await newRestaurant.save();
	const chefId = newRestaurantData.chef;
	await Chef.findByIdAndUpdate(chefId, { $push: { restaurants: savedRestaurant._id } });
	await Promise.all(
		newRestaurantData.dishes.map(async (dishId: any) => {
			await Dish.findByIdAndUpdate(dishId, { restaurant: savedRestaurant._id });
		})
	);
	return savedRestaurant;
}
export async function updateRestaurantByID(id: string, updatedRestaurantData: restaurant) {
	const existingRestaurant = await Restaurant.findById(id);
	const { name, image, popularity, address, from, to, openingDate, averagePrice, distance, chef, dishes } =
		updatedRestaurantData;

	if (!existingRestaurant) {
		throw new CustomError("Restaurant not found", 404);
	}

	const oldChefId = existingRestaurant.chef?.toString();

	existingRestaurant.name = name;
	existingRestaurant.image = image;
	existingRestaurant.popularity = popularity;
	existingRestaurant.address = address;
	existingRestaurant.from = from;
	existingRestaurant.to = to;
	existingRestaurant.openingDate = openingDate;
	existingRestaurant.averagePrice = averagePrice;
	existingRestaurant.distance = distance;
	existingRestaurant.chef = new Types.ObjectId(chef);
	existingRestaurant.dishes = dishes.map((dishId: any) => new Types.ObjectId(dishId));

	await Chef.findByIdAndUpdate(oldChefId, {
		$pull: { restaurants: id },
	});

	await Chef.findByIdAndUpdate(chef, {
		$push: { restaurants: id },
	});

	await Promise.all(
		dishes.map(async (dishId: any) => {
			if (!existingRestaurant.dishes.some((dish) => dish.toString() === dishId)) {
				await Dish.findByIdAndUpdate(dishId, {
					$pull: { restaurant: id },
				});
				await Dish.findByIdAndUpdate(dishId, {
					$push: { restaurant: id },
				});
			}
		})
	);

	const updatedRestaurant = await existingRestaurant.save();
	return updatedRestaurant;
}

export async function deleteRestaurantByID(id: string) {
	const restaurantToDelete = await Restaurant.findById(id);
	if (!restaurantToDelete) {
		throw new CustomError("Restaurant not found", 404);
	}

	const chefId = restaurantToDelete.chef;

	await Dish.deleteMany({ restaurant: id });

	await Chef.findByIdAndUpdate(chefId, { $pull: { restaurants: id } });

	const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
	if (!deletedRestaurant) {
		throw Error("Restaurant not found");
	}

	return deletedRestaurant;
}
