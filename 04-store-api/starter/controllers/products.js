const Product = require('../models/product');

const getAllProductsStatic = async(req,res)=>{
    try {
      
        await Product.find({name:{$regex:'ab',$options:'i'}},(err,data)=>{
            if(err){
            console.log(err);
            return;
            }
           res.json({data,nbhit:data.length});
        });
       } catch (error) {
        res.send(error);
        }
    
    
}   
const getAllProducts = async (req,res)=>{ 
    try {
        const {featured,rating,page,limit,company,name,sort,fields}=req.query;

        const queryObject = {};
        const pageno=parseInt(page);
        const limitno=parseInt(limit);
        const skipno = (pageno-1)*limitno;
        if(featured){
            queryObject.featured = featured ==='true'? true:false;
        }
        if(rating){
            queryObject.rating = {$gt:rating};
        }
        if(company){
         queryObject.company=company;  
        }
        if(name){
            queryObject.name={$regex:name,$options:'i'}; 
           }
      let  data =  Product.find(queryObject).limit(limitno).skip(skipno);
      if(sort){
        
        const sortlist = sort.split(',').join(' ');
        console.log(sortlist);
        data=data.sort(sortlist);
      }
      else{
          data=data.sort('createdAt');
      }
      console.log(data);
      if(fields){
        const fieldslist= fields.spilt(',').join(' ');
        data=data.select(fieldslist);
      }
      const ans = await data;
      console.log(ans);
      
      res.json({nbhit:data.length,ans});
    } catch (error) {
        res.send(error)
    }
}
module.exports = {
   getAllProducts,
   getAllProductsStatic
}