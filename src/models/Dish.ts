import { Schema, model } from "mongoose";

const validSide = ["White bread", "Sticky rice"];
const validChanges = ["Without peanuts", "Sticky less spicy"];
const validMealTypes = ["Breakfast", "Lunch", "Dinner"];

const DishSchema = new Schema({
	name: String,
	image: String,
	ingredients: String,
	icon: String,
	price: Number,
	side: {
		type: [String],
		validate: {
			validator: function (value: string[]) {
				return Array.isArray(value) && value.some((item) => validSide.includes(item));
			},
			message: "Invalid sides",
		},
	},
	changes: {
		type: [String],
		validate: {
			validator: function (value: string[]) {
				return Array.isArray(value) && value.some((item) => validChanges.includes(item));
			},
			message: "Invalid changes",
		},
	},
	mealType: {
		type: [String],
		validate: {
			validator: function (value: string[]) {
				return Array.isArray(value) && value.some((item) => validMealTypes.includes(item));
			},
			message: "Invalid mealType",
		},
	},
	restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
});

const Dish = model("Dish", DishSchema);

export default Dish;
