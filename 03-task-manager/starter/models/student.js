const mongoose  = require('mongoose');

const student  = new mongoose.Schema({
    name:{type:string},
    rollno:Number,
    passed:{type:Boolean,
              
            default:false}

})
module.exports=mongoose.model('student',student);