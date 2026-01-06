const validator=require("validator");
const validateSignUpDate=(req)=>{
    const {firstName, lastName, emailId, password}=req.body;
    if(!firstName || !lastName){
        // console.log(firstName+" "+lastName)
     throw new Error("Name is not valid")
       } else if(!validator.isEmail(emailId)){
          throw new Error("email is not valid")
       }else if(!validator.isStrongPassword(password)){
             throw new Error("Please enter a strong Password")
       }
};
module.exports={
    validateSignUpDate,
}