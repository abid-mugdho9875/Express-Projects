const userModel = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRETKEY = "NOTESAPI"
const signup = async(req, res) =>{

    //excisting user
    //hashed password
    //user creations
    //Token Generate
    const {username,password, email} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:'user already exist'})  
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await  userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        })
        const token = jwt.sign({email:result.email,id:result._id},SECRETKEY)
        res.status(201).json({user:result, token:token});

    } catch (error) {
        console.log("error");
        res.status(501).json({message:"something went wrong"})
    }
}
const signin = async (req, res) =>{
    const {password, email} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(400).json({message:'user not found'})  
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message:'Invalid credentials'})
        }
       
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRETKEY)
        res.status(201).json({user:existingUser, token:token});

    } catch (error) {
        console.log("error");
        res.status(501).json({message:"something went wrong"})
    }

}
module.exports ={signin, signup}