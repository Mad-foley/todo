// individual items belonging to category
// name, startdate, enddate, is completed, category(FK)

import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isCompleted: { type: Boolean, required: true },
    itemCategory: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true }
});

export const ItemModel = mongoose.model("items", ItemSchema);
