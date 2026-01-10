const express=require("express");
const {userauth}=require("../middlewares/auth")

const  requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest",userauth, (req, res)=>{
    res.send("send the connection request");   
});

module.exports=requestRouter;