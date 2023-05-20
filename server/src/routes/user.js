import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/register", async(req, res) => {
    const { email } = req.body
    console.log(email)
});
