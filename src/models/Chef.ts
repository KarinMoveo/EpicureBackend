import {Schema, model} from 'mongoose';

const ChefSchema = new Schema({
    name: String,
    image: String,
    summary: String,
    popularity: Number,
    isNew: Boolean,
    restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }],
});

const Chef = model('Chef', ChefSchema);

export default Chef;