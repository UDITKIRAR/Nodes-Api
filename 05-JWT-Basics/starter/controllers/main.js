const jwt = require('jsonwebtoken');
const  dashboard = async (req,res)=>{
    const head  = req.headers.authorization;
   
    if(!head){
         res.send("error");
    }
    const token = head.split(' ')[1];
    let data = "user";
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        data = decode.password;
    } catch (error) {
        console.log(error);
    }
     const luckynumber = Math.floor(Math.random()*100);
     res.status(200).json({msg:`hello, ${data} `,secret:`you lucky number is ${luckynumber}`});
}
const login = async(req,res)=>{
    try {

        const {username,password}=req.body;
        // if(!usename || !password){
        //     res.json({msg:'provide name and password'})
        // }
        const id = new Date().getDate();
        const token = jwt.sign({password,username},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json({msg:'user created',token:token})
        
    } catch (error) {
        console.log(error);
    }
   
}
module.exports = {login,dashboard};