import express from 'express';
import { CategoryModel } from '../models/category.js';
import { ItemModel } from '../models/item.js';

const router = express.Router();

//get all items in category
router.get("/:category_id", async(req, res) => {
    try{
        const items = await ItemModel.find({itemCategory: req.params.category_id})
        return res.json(items)
    } catch (err) {
        return res.json(err);
    }
})

router.post("/:category_id", async(req, res) => {
    const {name, startDate, endDate, isCompleted } = req.body;
    try{
        const category = await CategoryModel.findById({_id: req.params.category_id})
        const item = new ItemModel({name, startDate, endDate, isCompleted, itemCategory: category._id});
        const response = await item.save();
        return res.json(response)
    } catch (err){
        return res.json(err)
    }
});

export { router as itemRouter }
