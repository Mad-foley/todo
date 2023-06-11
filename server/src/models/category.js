//Main category that has one or more items
// name, description, created on, owner

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdOn: { type: Date, required: true },
    owner: {type: mongoose.Schema.Types.ObjectId , ref: "users", required: true}
});

export const CategoryModel = mongoose.model("categories", CategorySchema);
