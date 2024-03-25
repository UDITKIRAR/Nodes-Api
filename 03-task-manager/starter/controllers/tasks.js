const Task = require('../models/Task');

const getalltask =  async (req,res)=>{
      try {
      await  Task.find((err,data)=>{
            
           res.send(data);
        })
       
      } catch (error) {
        res.send(error);
      }
 
}
const creattask = async (req,res)=>{
   
    try {
        const data  = req.body;
        const task = await Task.create(data);
        res.status(201).json({task});
    } catch (error) {
        res.send(error);
    }
   
}

const gettask = async (req,res)=>{
  const d = req.params.id;
  try {
   
    const ans = await Task.findOne({_id:d});
    if(!ans){
      res.send("no oject found");
    }
    res.status(200).json({ans});
    
  } catch (error) {
    res.json({msg:`no object with ${d}`});
  }
   
}
const updatetask = async  (req,res)=>{
      try {
        const id = req.params.id;
        const data = req.body;
        await Task.findByIdAndUpdate({_id:id},data);
        res.status(200).json({msg:`succesfully updated`});
      } catch (error) {
        res.json({msg:`no object with ${id}`});
      }
}
const deltask = async(req,res)=>{

  const d = req.params.id;
  try {
    await Task.findByIdAndDelete({_id:d},(err,data)=>{
      if(err){
        res.json({msg:"no oject found"});
        return;
      }
      res.status(200).json({msg:`succesfully deleted`});
    });
  } catch (error) {
    res.json({msg:`no object with`});
  }
}

module.exports={getalltask,creattask,gettask,updatetask,deltask};