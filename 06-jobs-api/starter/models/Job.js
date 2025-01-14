const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
company :{
    type:String,
    required:[true,'pls provide company name'],
    maxlength:50
}
,
position:{
    type:String,
    required:[true,'pls provide position '],
    maxlength:100
},
status:{
    type:String,
    enum:['pending','interview','declined'],
    default:'pending',
},
createdBy:{
   type:mongoose.Types.ObjectId,
   ref:'User',
   required:[true,'pls provide userid '],

}
},{timestamps:true});

module.exports = mongoose.model('Job',JobSchema);