import express from 'express';
import { CategoryModel } from '../models/category.js';

const router = express.Router();

router.post("/", async(req, res) => {
    const category = new CategoryModel(req.body);
    try {
        const response = await category.save();
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

export { router as categoryRouter }
