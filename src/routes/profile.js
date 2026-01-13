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

profileRouter.patch("/profile/edit",userauth, async  (req, res)=>{
     console.log(req.user+"is there")
      try{
         if(!validateEditProfileData(req)){
             throw new Error("Invalid Edit Request")
         }
          const loggedInUser = req.user;
         console.log(loggedInUser)
         Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
          await loggedInUser.save();
        // res.send(req.body)
      }catch(err){
        // console.log(req.user)
        res.status(400).send("ERROR :"+ Error.message)
      }
})


module.exports=profileRouter;