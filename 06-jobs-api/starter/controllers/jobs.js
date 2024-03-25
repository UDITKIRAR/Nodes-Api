const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFoundError} = require('../errors');
const { use } = require('express/lib/router');



const  getalljobs = async(req,res)=>{
    const userId  =req.user.userId;
     const jobs = await Job.find({createdBy:userId}).sort('createdAt');
     
    res.status(201).json({jobs,nhit:jobs.length});
    
}
const  getjob = async(req,res)=>{
    try {
    const jobid = req.params.id;
    const userid = req.user.userId;
    const job =  await Job.findOne({_id:jobid,createdBy:userid});
    
    if(!job){
        throw new NotFoundError('not job exist');
    }
    res.status(201).json({job});
   }
       catch (error) {
    console.log(error); 
    }
}

const  createjob = async(req,res)=>{
    try {
    const {company,position}=req.body;
     const jobobj = await Job.create({company,position,createdBy:req.user.userId});
    res.status(201).json({jobobj});
    }
    catch (error) {
        console.log(error);
    }
   
}

const  deletejob= async(req,res)=>{
    const userid = req.user.userId;
       const jobid = req.params.id;
   
       const job = await Job.findOneAndRemove({_id:jobid,createdBy:userid})
   if(!job){
    throw new NotFoundError('no job with thid id');
   }
   res.send('succesfullt deleted');

}


const  updatejob = async(req,res)=>{
    try {
        
      const {company,position} = req.body;
       const userid = req.user.userId;
       const jobid = req.params.id;
    if(company==='' || position===''){
         throw new BadRequestError('comp or posit is empty')
    }
    const job = await Job.findByIdAndUpdate({_id:jobid,createdBy:userid},
        req.body,
        {new:true,runValidators:true})
    if(!job){
        throw new NotFoundError('not job exist');
    }
    res.status(201).json({job});
} catch (error) {
     console.log(error);   
}
}




module.exports = {getalljobs,
getjob,updatejob,deletejob,createjob
};