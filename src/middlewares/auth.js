const jwt=require("jsonwebtoken")
const User=require("../models/user")
  
const userauth=async (req, res, next)=>{
// read the token from the req cookies
     try{
       const {token}=req.cookies;
       if(!token){
          throw new Error("token is not valid!!");
       }
       const decodedobj=await jwt.verify(token, "DEV@INDER$790");
       const {_id}=decodedobj;
       const user= await User.findById(_id);
       if(!user){
        throw new Error("Invalid user")
       }
       req.user=user;
       next();
     }catch(err){
        res.status(400).send("ERROR"+err.message)
     }

// validate the token
// find the user
}
module.exports={
    userauth,
}