import {Schema, model} from 'mongoose';

const RestaurantSchema = new Schema({
    name: String,
    image: String,
    popularity: Number,
    address: String,
    from: String,
    to: String,
    openingDate: String, 
    averagePrice: Number,
    distance: Number,
    chef: { type: Schema.Types.ObjectId, ref: 'Chef' },
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
});

const Restaurant = model('Restaurant', RestaurantSchema);

export default Restaurant;
