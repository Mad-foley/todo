import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
import { userRouter } from './routes/user.js';
import { categoryRouter } from './routes/category.js';
import { itemRouter } from './routes/item.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
}
));
dotenv.config();

const checkJwt = auth({
  audience: 'http://localhost:8000',
  issuerBaseURL: 'https://dev-go5t6s26j0b5gebu.us.auth0.com/'
})


app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

app.use("/user", userRouter)
app.use("/category", categoryRouter)
app.use("/item", itemRouter)

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  console.log(res)
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});




mongoose.connect(`mongodb+srv://${process.env.MONGO_PASS}`)
app.listen(3001, () => console.log("Server Started"))
