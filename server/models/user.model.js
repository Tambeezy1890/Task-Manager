import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email field is required"],
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/,"Please enter a valid email"],
       
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username cannot exceed 20 characters"],
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;