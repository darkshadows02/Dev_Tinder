const express=require("express");
const {userauth}=require("../middlewares/auth")
const ConncetionRequest =require("../models/connectionRequest");
const User = require("../models/user");
const  requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userauth, async (req, res)=>{
     try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        // in case of status there is two possile ways 
        const allowedStatus=["ignored", "interested"];
          if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type: "+status})
          }
           
          // if we trying to send connection request someine but that person is not in db
          const toUser=await User.findById(toUserId)
            if(!toUser){
                return res.status(404).json({message: "User not found"});
            }
        // checking connection request if connection is alrady have b/w a-b and one thing is a-b have connection request alrady but we r trying to make connection b/w b-a 
          const existingConnectionRequest= await ConncetionRequest.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
          });
          if(existingConnectionRequest){
              return res.status(400).send({message: "connnection request alrady existing !!"});
          }
        const conncetionRequest=new ConncetionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const data= await conncetionRequest.save();
        res.json({
            message:"Connection Request Sent Sucessfully !!",
            data,
        })
     }catch(err){
        res.status(400).send("ERROR"+err.message)
     } 
});

module.exports=requestRouter;