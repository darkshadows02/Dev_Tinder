const express= require("express");
const { userauth } = require("../middlewares/auth");
const ConncetionRequest = require("../models/connectionRequest");
const userRouter=express.Router();


//get all the pending request for the loggedIn user
userRouter.get("/user/requests/received",userauth, async(req, res)=>{
     try{
        const loggedInUser=req.user;
         const conncetionRequest=await ConncetionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
         }).populate(
              "fromUserId","firstName lastName")
              //["firstName", "lastName"] also we write like this
          res.json({
            message:"Data fetched sucessfully",
            data:conncetionRequest
          })
     }catch(err){
        res.status(400).send("ERROR"+err.message)
     }
})



module.exports=userRouter;