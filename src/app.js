const express=require("express");
const connectDb =require("./config/database")
const app=express();
 const User=require("./models/user")
const {validateSignUpDate}=require("./utils/validation")
 const bcrypt=require("bcrypt");
 const cookieParser =require("cookie-parser")
 const jwt = require("jsonwebtoken")
app.use(express.json())
app.use(cookieParser()) ;
app.post("/signup", async (req, res)=>{
    //    console.log(req.body)
    try{  
        //validation first
        validateSignUpDate(req); 
        // then password encryption 
      const {firstName, lastName, emailId, password}=req.body;
        const passwordHash=await bcrypt.hash(password, 10);
 //creating a new instance of the user model
  
 const user=new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
 }); 
       await user.save()
    //    console.log("user added in database")
       res.send("user add sucessfully...")
        }catch(err){
            res.status(400).send("error saving the user:"+ err.message);
        }
       
});
// Login
app.post("/login", async(req, res)=>{
    try{
       const {emailId, password}=req.body;
           const user=await User.findOne({emailId:emailId})
           if(!user){
            throw new Error("Invllid credentials")
           }
           const isPasswordValid=await bcrypt.compare(password, user.password);
           if(isPasswordValid){
             const token= await jwt.sign({_id:user._id}, "DEV@INDER$790");
            //    console.log(token)
             res.cookie("token", token);
             res.send("Login Sucessful !!")
           }else{
              throw new Error("Invalid credential")
           }
    }catch(err){
        res.status(400).send("ERROR"+" "+err.message);
    }
})
app.get("/profile", async(req, res)=>{
       try{
       const cookies=req.cookies;
        const {token}=cookies;
    //    console.log(token)
          if(!token){
            throw new Error("Invalid token")
          }
         const decodedMessage=await jwt.verify(token, "DEV@INDER$790");
         const {_id}=decodedMessage;
        //  console.log("logged in user is " + _id);
         const user=await User.findById(_id);
          if(!user){
              throw new Error("Invalid user")
          }
    res.send(user)}catch(err){
        res.status(400).send("ERROR"+err.message)
    }
})
//get user by email
//checking for finding models in db for one
app.get("/user", async (req, res)=>{
       try{
       const users=  await User.findOne({emailId:req.body.emailId})
      res.send(users)
    }catch(err){
        res.status(400).send("error saving the user", err.message);
       }
})
 // feed API - get/feed - get all the users from the database
app.get("/feed", async(req, res)=>{
       try{
          const users=await User.find({})
          res.send(users)
       }catch(err){
        res.status(400).send("error saving the user", err.message);
       }
})
// delete -user from database
app.delete("/user", async(req, res)=>{
    const userid=req.body.userId;
    // console.log(userid)
       try{
         const users=await User.findByIdAndDelete(userid)
           res.send(users)
        }catch(err){
        res.status(400).send("error saving the user", err.message);
       }
})
                //params
app.patch("/user/:userid", async (req, res)=>{
    const userid=req.params?.userid;
    const data=req.body;
       try{
           const ALLOWED_UPDATEDS=[
             "photoUrl",
             "about",
             "gender",
             "age",
             "skills"
           ];
        //    console.log(ALLOWED_UPDATEDS)
           const isUpdateAllowed= Object.keys(data).every((k)=>
            ALLOWED_UPDATEDS.includes(k)
       );
           console.log(isUpdateAllowed);

           if(!isUpdateAllowed){
             throw new Error("Update not allowed")
           }
           if(data.skills.length>10){
               throw new Error("size is greter then 10")
           }
         await User.findByIdAndUpdate({ _id:userid}, data, {runValidators:true})
      res.send("data updated")
    }catch(err){
        res.status(400).send("error saving the user"+err.message);
       }
})

connectDb().then(()=>{
    console.log("cluster connected sucessfually...")
    app.listen(3000, ()=>{
        console.log("server created sucessfully")
    });
}).catch((err)=>{
    console.log("database cannot be connected!!")
})
 