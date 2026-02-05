const mongoose=require("mongoose");
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userSchema=mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:15
    },
    lastName:{
        type: String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email id"+value);
        }
    }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("ENTER A STRONG PASSWORD"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:60
    },
    gender:{
        type:String ,
        validate(value){
              if(!["male", "female", "other"].includes(value)){
                throw new Error("gender data is not valid")
              }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.pngkey.com/maxpic/u2q8r5t4i1t4o0q8/",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid PHOTO URL"+value);
            }
        }
    },
    about:{
        type:String,
        default:"this is defult about all the a/c"
    },
    skills:{
         type:[String],
         maxLength:10
    }

}, {
    timestamps:true,
})
userSchema.methods.getJWT=async function (){
        const user=this;
    const token=await jwt.sign({_id:user._id}, "DEV@INDER$790", {expiresIn:"7d"});
     return token;
}
userSchema.methods.validatePassword=async function(passwordInputByUser) {
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
const User=mongoose.model("User", userSchema);
module.exports=User;