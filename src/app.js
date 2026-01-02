const express=require("express");
const connectDb =require("./config/database")
const app=express();
 const User=require("./models/user")

  app.use(express.json())

app.post("/signup", async (req, res)=>{
    //creating a new instance of the user model
    //    console.log(req.body)
    const user=new User(req.body);
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
 