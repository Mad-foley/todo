import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { UserModel } from '../models/user.js';

const router = express.Router();

const checkJwt = auth({
    audience: 'http://localhost:8000',
    issuerBaseURL: 'https://dev-go5t6s26j0b5gebu.us.auth0.com/'
})

//password and username stored in extrenal database with auth0
router.post("/register", checkJwt, async(req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({email: email});
    if (user) {
        return res.json({message: "user already exists"})
    }

    const newUser = new UserModel({email: email});
    await newUser.save();

    res.json({message: "user successfully added to database"})
});

export { router as userRouter }
