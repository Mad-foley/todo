import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/user.js'


const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: 'include'
}));

app.use("/auth", userRouter);

dotenv.config();

mongoose.connect(`mongodb+srv://maddy-foley-5:${process.env.MONGO_PASS}@todo.hhd2kpw.mongodb.net/?retryWrites=true&w=majority`)
app.listen(3001, () => console.log("Server Started"))
