import mongoose from "mongoose";

//userSchema

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true}
});

export const UserModel = mongoose.model("users", UserSchema);
