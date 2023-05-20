import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const app = express();

app.use(express.json());
app.use(cors);

dotenv.config();
const checkJwt = auth({
    audience: 'http://localhost:3000',
    issuerBaseURL: `http://localhost:3000`,
});

app.get('/api/public', function(req, res) {
    console.log(req)
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});


mongoose.connect(`mongodb+srv://maddy-foley-5:${process.env.MONGO_PASS}@todo.hhd2kpw.mongodb.net/?retryWrites=true&w=majority`)
app.listen(3001, () => console.log("Server Started"))
