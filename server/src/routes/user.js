import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { UserModel } from '../models/user.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


const router = express.Router();

dotenv.config();

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

router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        res.json({message: "User Doesn't Exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        res.json({message: "Wrong Password!"});
    }
    let payload = {
        "id": JSON.stringify(user._id),
        "role": "Admin"
      };

    const token = jwt.sign(payload, process.env.TOKEN_KEY, { noTimestamp:true, expiresIn: '1h' });
    res.status(200).send(JSON.stringify({ accessToken: token }));
});

router.get("/token", async(req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).send(); // Unauthorized
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          res.status(403).send(); // Forbidden
        }
    });

    let id = jwt.verify(token, process.env.TOKEN_KEY).id;
    // const user = await UserModel.findById({ _id: new mongoose.Types.ObjectId(id)})

    console.log(await UserModel.findById(new mongoose.Types.ObjectId(id)))
    res.json({message: true })
});

export { router as userRouter }
