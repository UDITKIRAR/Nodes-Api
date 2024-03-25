const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');
 
const auth = async(req,res,next)=>{
      const authheader = req.headers.authorization;
      if(!authheader){
        throw new UnauthenticatedError('no token provided');
      }
    console.log(authheader);
   const token = authheader.split(' ')[1];

   try {
     const payload = jwt.verify(token,process.env.JWT_SECRET);
     console.log(payload);
     req.user={userId:payload.userId,name:payload.name};
     

     next();
   } catch (error) {
        throw new UnauthenticatedError('dffd');
   }
 
}
module.exports = auth;