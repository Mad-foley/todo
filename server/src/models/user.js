import mongoose from "mongoose";

//userSchema

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.Mixed, required: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
})

export const UserModel = mongoose.model("users", UserSchema);
