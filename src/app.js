const express=require("express");

const app=express();
// middlewares
const {adminauth, userauth}=require("./middlewares/auth")

app.use("/admin", adminauth);

app.get("/admin/getalldata", (eq, res, next)=>{
       res.send("User data sent");
})
app.get("/admin/getalldata", (eq, res, next)=>{
    res.send("User data sent");
})
app.get("/admin/deleteuser", (eq, res, next)=>{
    res.send("User data sent");
})

app.get("/user",userauth, (req, res, next)=>{
    console.log("handling / user routes")
    res.send("respond route 2")
})



// app.get("/", (req, res, next)=>{
//     console.log("handling / user routes")
//     next();
// })

// app.get("/user", (req, res, next)=>{
//     console.log("handling / user routes")
//        next();
// }, (req, res, next)=>{
//     //    res.send("respond route 1")
//     console.log("handling routess 2")
//     next();
// },(req, res)=>{
//     res.send("respond route 2")
// })

// app.get('/user', (req, res, next)=>{
//     console.log("handeling the route user 1 !!")
//       next();
// },(req, res, next)=>{
//     console.log("handeling the route user 2 !!")
//       next();
// },(req, res, next)=>{
//     console.log("handeling the route user 3 !!")
//       next();
// },(req, res)=>{
//     console.log("handeling the route user 4 !!")
//     res.send("responce!!")
// })

// app.get("/hello", (req, res)=>{
//     res.send("hello from the server!")
// })
// app.post("/hello", (req, res)=>{
//     console.log("post call")
//     res.send({firstname:"suraj", lastname:"kumar"})
// })
// app.delete("/hello", (req, res)=>{
//     console.log("delete call")
//     res.send("deleted save request")
// })

app
// app.use((req, res)=>{
//     res.send("hello from the server!")
// })
// app.use("hello", (req, res)=>{
//     res.send("hello from the server!")
// })

app.listen(3000, ()=>{
    console.log("server created sucessfully")
});