import { restaurant } from "./mockData/data/types";

function isRestaurantOpen(from: string, to: string): boolean {
	const now = new Date();
	const [fromHour, fromMinute] = from.split(":").map(Number);
	const [toHour, toMinute] = to.split(":").map(Number);

	const fromTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), fromHour, fromMinute);
	const toTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), toHour, toMinute);

	return now >= fromTime && now <= toTime;
}

export function filterRestaurants({ minPrice = 12, maxPrice = 357, distance = 100, rating, category, allRestaurants }: any) {
	const tempRestaurants: restaurant[] = [];
	const popularity = category === "Most Popular" ? 4 : 0;
	const restaurantOpeningYear = category === "New" ? 2020 : 0;

	allRestaurants.forEach((restaurant: restaurant) => {
		const [day, month, year] = restaurant.openingDate.split(".");
		const isRestaurantCurrentlyOpen = category !== "Open Now" || isRestaurantOpen(restaurant.from, restaurant.to);

		if (
			restaurant.popularity >= popularity &&
			Number(year) >= restaurantOpeningYear &&
			isRestaurantCurrentlyOpen &&
			restaurant.averagePrice >= minPrice &&
			restaurant.averagePrice <= maxPrice &&
			restaurant.distance <= distance
		) {
			tempRestaurants.push(restaurant);
		}
	});

	return tempRestaurants;
}
