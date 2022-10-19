const mongoose = require("mongoose")


const photoSchema = mongoose.Schema({

    name : { 
        type : String,
        required : [true, "Please provide a title."],
        trim: true

    },
    description: {
        type: String,
        required : [true, "Please provide a description."],
        trim: true
    },
    
    uploadedAt: {
        type: Date,
        default : Date.now
    },

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    url : {
        type : String,
        required: true
    },

    image_id: {
        type:String,
        required: true
    }


});










const Photo = mongoose.model("Photo",photoSchema)


module.exports = Photo;


