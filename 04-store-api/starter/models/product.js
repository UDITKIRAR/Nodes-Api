const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name:{type:String
    ,required:[true,'value must provided']
      },
    price :{
        type:Number, required:[true,'value must be provided'],
    },
    featured:{type:Boolean,default:false}
    ,
    rating:{
        type:Number,
        default:4.5
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now(),

    },
    company:{
        type:String,
        enum:{
           values: ['ikea','liddy','marcos','caressa'],
           message:'not '
        }
    }
});
module.exports = mongoose.model('Products',ProductSchema);