import mongoose from "mongoose";

//userSchema

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

export const UserModel = mongoose.model("users", UserSchema);
