const User = require('../models/User');
const {StatusCodes}=require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const  register = async(req,res)=>{
    try{   
        const { name, email, password } = req.body;
        const user = await User.create({name,email,password});
        res.status(StatusCodes.CREATED).json({user:name,token:user.createJWT()});
    }
    catch(er){
      console.log(er);
    }
}
const login = async(req,res)=>{
    
    try {

        const {email,password}=req.body;
    if(!email || !password){
        throw new BadRequestError('pls provide email and password')
    }
    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('invalid credentials');
    }
    console.log('wrong password')
  const ispasswordcorrect = await user.comparepassword(password);
    if(!ispasswordcorrect){
       
        throw new UnauthenticatedError('Invlid credentials');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:user.name,token:token});
        
    } catch (error) {
        res.send(error);
    }
    
}
module.exports = {login,register};