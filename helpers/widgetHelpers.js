const Photo = require("../models/Photo");
const Blog = require("../models/Blog");


const dataList = async(req,res,err)=>{


    
    const photosList = await Photo.find({}).sort({uploadedAt: -1}).limit(5);
    const blogsList = await Blog.find({}).sort({uploadedAt: -1}).limit(5);
    const commentsList = await Blog.find({});


    return {photosList,blogsList,commentsList}
}



module.exports = {dataList}