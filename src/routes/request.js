const express=require("express");
const {userauth}=require("../middlewares/auth")
const ConncetionRequest =require("../models/connectionRequest")
const  requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userauth, async (req, res)=>{
     try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
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