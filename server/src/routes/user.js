import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.js';
import dotenv from 'dotenv';


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
    const user = await UserModel.findOne( { username } );
    if (!user) {
        res.json({message: "User Doesn't Exist!"});
    }
    const isPasswordValid = await bcrypt.compare(password, user['password'])

    if (!isPasswordValid) {
        res.json({message: "Wrong Password!"});
    }
    let payload = {
        "id": user._id,
        "role": "Admin"
      };

    let token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: '1h',
        issuer:"http://localhost:3001",
    });

    res.cookie("token",token, {
        secure: false,
        httpOnly: true,
    });
    res.send();
});

router.get("/token", async(req, res) => {
    let token;
    //check if token
    if(!req.headers.cookie) token=null
    else token=req.headers.cookie.slice(6);

    if (token == null) {
        res.json({ token: false }); // Unauthorized
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          res.status(403).send(); // Forbidden
        }
        return user
    });

    const id = decoded.id
    const user = await UserModel.findById(id)

    // find user and check role permissions
    if(user && decoded.role == 'Admin'){
        res.json({ token: true })
    } else {
        res.status(404).send(); // Not Found
    }
});

export { router as userRouter }
