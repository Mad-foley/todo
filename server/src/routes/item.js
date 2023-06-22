import express from 'express';
import { CategoryModel } from '../models/category.js';
import { ItemModel } from '../models/item.js';

const router = express.Router();

router.post("/:id", async(req, res) => {
    const {name, startDate, endDate, isCompleted } = req.body;
    try{
        const category = await CategoryModel.findById({_id: req.params.id})
        const item = new ItemModel({name, startDate, endDate, isCompleted, itemCategory: category._id});
        const response = await item.save();
        return res.json(response)
    } catch (err){
        return res.json(err)
    }

});

export { router as itemRouter }
