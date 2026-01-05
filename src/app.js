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
            res.status(400).send("error saving the user:"+ err.message);
        }
       
});
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
 