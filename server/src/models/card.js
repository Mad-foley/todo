import mongoose from "mongoose";

//userSchema

const CategorySchema = new mongoose.Schema({
    name: { type: String},
    description: {type: String},
    owner: {type: String}
});

export const CategoryModel = mongoose.model("category", CategorySchema);
