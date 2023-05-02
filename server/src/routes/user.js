import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { UserModel } from '../models/user.js';

const router = express.Router();

async function saltedPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed
}

router.post("/create", async(req, res) => {
    const {username, password } = req.body;

    const user = await UserModel.findOne({username});
    const hash = await saltedPassword(password);
    if (user) {
        return res.json({message: "User already exists"});
    }

    const newUser = new UserModel({username, password: hash});
    await newUser.save();

    res.json({message: "Successfully added user!"});
});

export { router as userRouter }
