import express from 'express';
import { CategoryModel } from '../models/category.js';
import { ItemModel } from '../models/item.js';

const router = express.Router();

//PERSONAL NOTE:
//may need to add authenication later

//get all items in category
router.get("/:category_id", async(req, res) => {
    try{
        const items = await ItemModel.find({itemCategory: req.params.category_id})
        return res.json(items)
    } catch (err) {
        return res.json(err);
    }
});

//get single item from category
router.get("/:category_id/:item_id", async(req, res) => {
    try{
        const item = await ItemModel.findOne({itemCategory:req.params.category_id, _id: req.params.item_id})
        return res.json(item);
    } catch(err){
        return res.json(err);
    }
});

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

router.put("/:category_id/:item_id", async(req, res) => {
    const item = await ItemModel.findOne({itemCategory:req.params.category_id, _id: req.params.item_id});
    try {
        const {name, startDate, endDate, isCompleted} = req.body;
        Object.assign(item, {name, startDate, endDate, isCompleted});
        await item.save();
        return res.json(item)
    } catch(err){
        return res.json(err);
    }
});

router.delete("/:category_id/:item_id", async(req, res) => {
    try{
        const category = await ItemModel.deleteOne({itemCategory: req.params.category_id, _id: req.params.item_id});
        res.json(category)
    } catch(err){
        res.json(err);
    }
});

export { router as itemRouter }
