const express=require("express");
const profileRouter=express.Router();
const {userauth}=require("../middlewares/auth")
const {validateEditProfileData} =require("../utils/validation")

profileRouter.get("/profile",userauth, async(req, res)=>{
    try{
 const user=req.user;
 res.send(user)
}catch(err){
     res.status(400).send("ERROR"+err.message)
 }
})

profileRouter.patch("/profile/edit", (req, res)=>{
      try{
         if(!validateEditProfileData(req)){
             throw new Error("Invalid Edit Request")
         }
         const loggedInUser = req.user;
         console.log(loggedInUser)
      }catch(err){
        res.status(400).send("ERROR :"+ Error.message)
      }
})


module.exports=profileRouter;