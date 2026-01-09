const express=require("express");
const connectDb =require("./config/database")
const app=express();
 const User=require("./models/user")
const {validateSignUpDate}=require("./utils/validation")
 const bcrypt=require("bcrypt");
 const cookieParser =require("cookie-parser")
 const jwt = require("jsonwebtoken")
 const {userauth}=require("./middlewares/auth")
app.use(express.json())
app.use(cookieParser()) ;
app.post("/signup", async (req, res)=>{
    try{  
        validateSignUpDate(req); 
      const {firstName, lastName, emailId, password}=req.body;
        const passwordHash=await bcrypt.hash(password, 10);
  
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
            throw new Error("  Invllid credentials")
           }
           const isPasswordValid=await user.validatePassword(password);
           if(isPasswordValid){
             const token= await  user.getJWT();
             res.cookie("token", token);
             res.send("Login Sucessful !!")
           }else{
              throw new Error("Invalid credential")
           }
    }catch(err){
        res.status(400).send("ERROR"+" "+err.message);
    }
})
app.get("/profile",userauth, async(req, res)=>{
       try{
    const user=req.user;
    res.send(user)
}catch(err){
        res.status(400).send("ERROR"+err.message)
    }
})

app.post("/sendConnectionRequest",userauth, (req, res)=>{
     res.send("send the connection request");   
});

connectDb().then(()=>{
    console.log("cluster connected sucessfually...")
    app.listen(3000, ()=>{
        console.log("server created sucessfully")
    });
}).catch((err)=>{
    console.log("database cannot be connected!!")
})
 