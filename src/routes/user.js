const express= require("express");
const { userauth } = require("../middlewares/auth");
const ConncetionRequest = require("../models/connectionRequest");
const authRouter = require("./auth");
const User = require("../models/user");
const userRouter=express.Router();


const USER_SAFE_DATA="firstName lastName age gender about skill";

//get all the pending request for the loggedIn user
userRouter.get("/user/requests/received",userauth, async(req, res)=>{
     try{
        const loggedInUser=req.user;
         const conncetionRequest=await ConncetionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
         }).populate("fromUserId",USER_SAFE_DATA)
               //["firstName", "lastName"] also we write like this
          res.json({
            message:"Data fetched sucessfully",
            data:conncetionRequest
          })
     }catch(err){
        res.status(400).send("ERROR"+err.message)
     }
})
userRouter.get("/user/connections", userauth,  async(req, res)=>{
    try{
        const loggedInUser=req.user;
        const conncetionRequest=await ConncetionRequest.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"},
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const data=conncetionRequest.map((row)=>{
                if(row.fromUserId.toString()===loggedInUser._id.toString()){
                    return row.toUserId
                }else{
                    return row.fromUserId
                }
        })
        res.json({data})
    }catch(err){
        res.status(400).send("ERROR"+err.message) 
    }
})

userRouter.get("/feed", userauth, async(req, res)=>{
       try{
           const page=parseInt(req.query.page) || 1;
           const limit =parseInt(req.query.limit) || 10;
           const skip=(page-1)*limit;
            //   limit=(limit>50)?50:limit;

        const loggedInUser=req.user;
        const conncetionRequests=await ConncetionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        conncetionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users =await User.find({
            $and:[
              {_id:{$nin:Array.from(hideUserFromFeed)}},
               {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

      res.send(users);

       }catch(err){
        res.status(400).send("ERROR"+err.message)
       }
})



module.exports=userRouter;