import express from 'express';
import { CategoryModel } from '../models/category.js';
import { UserModel } from '../models/user.js';
import { checkJwt } from './user.js';

const router = express.Router();

//needs authentication
router.post("/", async(req, res) => {
    const email = process.env.TEST_EMAIL
    const user = await UserModel.findOne({email: email})
    console.log(user)
    console.log(user._id)
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

export { router as categoryRouter }
