const validator=require("validator");
const validateSignUpDate=(req)=>{
    const {firstName, lastName, emailId, password}=req.body;
    if(!firstName || !lastName){
      throw new Error("Name is not valid")
       } else if(!validator.isEmail(emailId)){
          throw new Error("email is not valid")
       }else if(!validator.isStrongPassword(password)){
             throw new Error("Please enter a strong Password")
       }
};
const validateEditProfileData=(req)=>{
      const allowwdEditFields=[
        "firstName", 
        "lastName",
         "emailId", 
         "photoUrl", 
         "gender", 
         "age", 
         "about", 
         "skills"];
      const isEditAllowed=Object.keys(req.body).every((fileld)=>
        allowwdEditFields.includes(fileld)
    )
    return isEditAllowed;
}
module.exports={
    validateSignUpDate,
    validateEditProfileData,
}