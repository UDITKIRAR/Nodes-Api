const mongoose = require('mongoose')
require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
})
UserSchema.pre('save',async function(){
    const salt  = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password,salt);
})
UserSchema.methods.createJWT = function (){
  const token = jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
  return token;
}
UserSchema.methods.comparepassword = async function(candidate){
  const ismatch = await bcrypt.compare(candidate,this.password);
  return ismatch;
    
}






module.exports = mongoose.model('User', UserSchema)
