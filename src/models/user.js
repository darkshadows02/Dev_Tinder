const mongoose=require("mongoose");

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
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        max:60
    },
    gender:{
        type:String ,
        validate(value){
              if(!["male", "famale", "other"].includes(value)){
                throw new Error("gender data is not valid")
              }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.pngkey.com/maxpic/u2q8r5t4i1t4o0q8/"
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

const User=mongoose.model("User", userSchema);
module.exports=User;