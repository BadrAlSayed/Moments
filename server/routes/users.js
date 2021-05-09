import express from 'express';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signIn', async (req,res) =>{
const { email, password } = req.body;
try {
    const check = await userModel.findOne({email: email });
    const passCheck = await bcrypt.compare(password, check.password);
    if(!check) 
        return res.status(404).json({message: "The user doesn't exit"})
    if(!passCheck)
        return res.status(400).json({message: "wrong password"});

    const token = jwt.sign({email: check.email, id: check._id},'test', {expiresIn: "1hr"}) 
       res.status(200).json(check, token)
} catch (error) {
    res.status(500).json({message:"something went wrong"});
}
});

router.post('/signUp', async (req,res) =>{
    const {email, password, confirmPassword, firstName, lastName } = req.body;
    const check = await userModel.findOne({email: email});
    
    if(check)
    return res.status(400).json({message: "already have an account"});
    
    if(!(password == confirmPassword))
    return res.status(4000).json({message: "passwords dont match"});
    
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = userModel.create({email: email, password: hashedPassword, name: `${firstName} ${lastName}`});
    
    const token = jwt.sign({email: result.email, id: result._id},'test', {expiresIn: "1hr"});

    return res.status(200).json(result,token)

    
});

export default router;