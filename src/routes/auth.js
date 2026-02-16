 const express=require("express");
 const {validateSignUpDate}=require("../utils/validation")
 const User=require("../models/user")
 const bcrypt=require("bcrypt");

 const authRouter=express.Router();
 authRouter.post("/signup", async (req, res)=>{
    try{
        // console.log("sur")
        validateSignUpDate(req); 
      const {firstName, lastName, emailId, password}=req.body;
        
        const passwordHash=await bcrypt.hash(password, 10);
  
 const user=new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
 }); 
     

      const savedUser= await user.save();
      
      const token=await savedUser.getJWT();
       
      res.cookie("token" , token, {
        expires: new Date(Date.now() + 8*36000000)
      });
      
       res.json({message:"user add sucessfully...", data:savedUser})
        }catch(err){
            res.status(400).send("error saving the user:"+ err.message);
        }
       
});
authRouter.post("/login", async(req, res)=>{
    try{
       const {emailId, password}=req.body;   
           const user=await User.findOne({emailId:emailId})
              
           if(!user){
            throw new Error("Invllid credentials")
           }
            // console.log(req.body)
           const isPasswordValid=await user.validatePassword(password);
            
           if(isPasswordValid){
             const token= await  user.getJWT();
             res.cookie("token", token, {httpOnly:true,secure: false,
              sameSite: "lax", });
             res.send (user)
           }else{
              throw new Error("Invalid credential")
           }
    }catch(err){
        res.status(400).send("ERROR"+" "+err.message);
    }
})

authRouter.post("/logout", async (req, res)=>{
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.send("logout sucessfll !!")
})
 module.exports=authRouter;
 