import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrpyt from 'bcrypt';
export const signup = async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {email,username,password} = req.body;
        
        if(!email || !username || !password){
            await session.abortTransaction();
            await session.endSession()
            res.status(400).json({success: false, message: "Email,username and password are required"});
        }   
        const userExist = await User.findOne({email}).session(session);
        if(userExist){
            await session.abortTransaction();
            await session.endSession()
            res.status(400).json({success: false, message: "User already exists"});
        }
        const hashedPassword = await bcrpyt.hash(password,10);
        const newUser = await User.create([{email, username, password: hashedPassword}],{session});

        await session.commitTransaction();
        await session.endSession();
        const user = {
            email: newUser[0].email,
            username: newUser[0].username,
        }

        return res.status(200).json({success: true, message: "User created successfully",user});

    }catch(err){
        await session.abortTransaction();
        await session.endSession()
        next(err);
    }
}
export const login = async(req,res,next)=>{
    
}
export const getUser = async(req,res,next)=>{
    
}
