const express=require("express");
const connectDb =require("./config/database")
const app=express();
 const User=require("./models/user")


app.post("/signup", async (req, res)=>{
    //creating a new instance of the user model
        const user=new User({
            firstName:"atharv",
            lastName:"arya",
            emailId:"atharv@tcs.com",
            password:"Athrav@123"
        });
        try{
       await user.save()
       console.log("user added in database")
       res.send("user add sucessfully...")
        }catch(err){
            res.status(400).send("error saving the user", err.message);
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
 