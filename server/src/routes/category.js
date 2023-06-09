import express from 'express';
import { CategoryModel } from '../models/category.js';
import { UserModel } from '../models/user.js';
import { checkJwt } from './user.js';
import { ItemModel } from '../models/item.js';

const router = express.Router();

//needs authentication
router.post("/", async(req, res) => {
    const email = process.env.TEST_EMAIL
    const user = await UserModel.findOne({email: email})
    if(user){
        const {name, createdOn, description} = req.body
        const category = new CategoryModel({name, createdOn, description, owner: user._id});
        try {
            await category.save();
            return res.json(category);
        } catch(err) {
            return res.json(err);
        }
    }

    res.json({message: "could not find user"});
});

//needs authentication and filter by id
router.get("/", async(req, res) => {
    try{
        // TEST *** TO BE REPLACED ***
        const email = process.env.TEST_EMAIL
        const user = await UserModel.findOne({email: email})
        // TEST

        const categories = await CategoryModel.find({owner: user?._id})
        return res.json(categories)
    } catch(err) {
        res.json(err);
    }
});

// get individual category
router.get("/:id", async(req, res) => {
    try{
        const category = await CategoryModel.findById(req.params.id);
        res.json({ category });
    } catch(err){
        res.json(err);
    }
})

//cascade delete
router.delete("/:id", async(req, res) => {
    try{
        const items = await ItemModel.deleteMany({itemCategory: req.params.id});
        const category = await CategoryModel.deleteOne({_id: req.params.id});
        res.json({category, items})
    } catch(err){
        res.json(err);
    }
})

export { router as categoryRouter }
