const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
        minlenght: [10,"Please provide a title at least 10 characters"]
        
    },  

    content: {
        type: String,
        trim: true,
        required: true,
        minlenght: [10,"Please provide a title at least 10 characters"]
        
    },
    
    url : {
        type : String,
        required: true
    },

    image_id: {
        type:String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    slug : {
        type: String
    },

    categories : [
        {
            type: String,

        }
    ],

    comments : [

        {
            content :{

                type : String,
                trim: true,
                required: true

            },

            user : {
                type: mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        }

    ]





},
{
    timestamps: true

});



const Blog = mongoose.model("Blog", blogSchema);


module.exports = Blog;
