const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username area is required"],
        trim: true,
        lowercase: true,
        unique : true,
        validate: [validator.isAlphanumeric, "Only Alphanumeric characters"]

    },

    email: {
        type: String,
        required : [true, "Email area is required"],
        unique : true,
        validate: [validator.isEmail, "Valid email is required"]

    },

    password : {

        type : String,
        required : [true, "Password area is required"],
        minlength: [4, "At least 4 characters"]
     },

    followers : [{
        
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    followings : [{
    
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]



},{
        
    timestamps : true
    
});

userSchema.pre("save" , function(next){
    
    bcrypt.hash(this.password, 10, (err,hash)=>{

        this.password = hash;
        next();

    })


})



const User = mongoose.model("User", userSchema)


module.exports = User;

