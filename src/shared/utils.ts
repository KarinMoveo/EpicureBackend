import { chef, dish, restaurant } from "./types";

function isRestaurantOpen(from: string, to: string): boolean {
	const now = new Date();
	const [fromHour, fromMinute] = from.split(":").map(Number);
	const [toHour, toMinute] = to.split(":").map(Number);

	const fromTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), fromHour, fromMinute);
	const toTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), toHour, toMinute);

	return now >= fromTime && now <= toTime;
}

export function filterRestaurants({
	allRestaurants,
	category = 'Everything',
	minPrice = 12,
	maxPrice = 357,
	distance = 100,
	rating = 31,
}: any) {
	const tempRestaurants: restaurant[] = [];
	const popularity = category === "Most Popular" ? 4 : 0;
	const restaurantOpeningYear = category === "New" ? 2020 : 0;

	allRestaurants.forEach((restaurant: restaurant) => {
		const [year, month, day] = restaurant.openingDate.split("-");
		const isRestaurantCurrentlyOpen = category !== "Open Now" || isRestaurantOpen(restaurant.from, restaurant.to);
		// const isRestaurantCurrentlyOpen = category === "Open Now" && isRestaurantOpen(restaurant.from, restaurant.to);


		const restaurantRatingBitWise = 1 << (restaurant.popularity - 1);

		if (
			restaurant.popularity >= popularity &&
			Number(year) >= restaurantOpeningYear &&
			isRestaurantCurrentlyOpen &&
			restaurant.averagePrice >= minPrice &&
			restaurant.averagePrice <= maxPrice &&
			restaurant.distance <= distance &&
			(rating | restaurantRatingBitWise) == rating
		) {
			tempRestaurants.push(restaurant);
		}
	});

	return tempRestaurants;
}

export function filterChefs({ allChefs, category }: any) {
	const tempChefs: chef[] = [];
	const mostViewedChefs = category === "Most Viewed" ? 4 : 0;

	allChefs.forEach((chef: chef) => {
		if (chef.popularity >= mostViewedChefs && (category !== "New" || chef.isNew === true)) {
			tempChefs.push(chef);
		}
	});

	return tempChefs;
}

export function filterDishes({ restaurantsDishes, category }: any) {
	return restaurantsDishes.filter((dish: dish) => dish.mealType.includes(category)).map((dish: dish) => dish);
}
