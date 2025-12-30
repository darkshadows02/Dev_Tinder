
  const adminauth=(req, res, next)=>{
    console.log("admin auth getting checked !!");
        const token="xyz";
        if(token!="xyz"){
            res.status(401).send("unauthorized request")
        }else{
            next();
        }
}
const userauth=(req, res, next)=>{
    console.log("user auth getting checked !!");
        const token="xyz";
        if(token!="xyz"){
            res.status(401).send("unauthorized request")
        }else{
            next();
        }
}
module.exports={
    adminauth,
    userauth,
}