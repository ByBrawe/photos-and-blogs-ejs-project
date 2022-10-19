
const Blog = require("../models/Blog");
const {v2} = require("cloudinary")
const fs = require("fs");
const Photo = require("../models/Photo");
const {dataList} = require("../helpers/widgetHelpers");



const getBlog = async(req,res,err)=>{


    try{
        const blogs = await Blog.find({}).populate("user").limit(5).sort({createdAt : -1});



       const data = await dataList()
        
       photosList= data.photosList
       blogsList = data.blogsList
       commentsList = data.commentsList



        res.status(200).render("blog", {
            blogs,
            photosList,
            blogsList,
            commentsList,
            link: "blog"
        })

      

       
      

    }catch(err){

        res.status(400).json({
            status: false,
            err : err.message
        })

    } 


}

const getAPost = async(req,res,next)=>{

 
    try{
        const id = req.params.id
        const blog = await Blog.findById(id).populate("user")
        const comments = await Blog.findById(id).populate({    
                path: 'comments',
                populate: { path: 'user' }
              }
        )

        
        const photosList = await Photo.find({}).sort({uploadedAt: -1}).limit(5);
        const blogsList = await Blog.find({}).sort({uploadedAt: -1}).limit(5);
              
        // console.log(comments.comments[0])


        res.status(200).render("onepost", {
            blog,
            photosList,
            blogsList,
            comments,
            link: "blog"
        })

      

       
      

    }catch(error){

        res.status(400).json({
            status: false,
            error
        })

    }


}

const createPost = async(req,res,err)=>{

 
    try{
        const upload = await v2.uploader.upload(
            req.files.blog_image.tempFilePath, {
                use_filename : true,
                folder : "lenslight"
            }
        )

        const multiple = req.body.multiple;

        const {title, content} = req.body;
        
        const blog = await Blog.create({

            title,
            content,
            user : res.locals.user._id,
            url : upload.secure_url,
            image_id : upload.public_id,
            categories : multiple


        })

        fs.unlinkSync(req.files.blog_image.tempFilePath)






        res.status(200).redirect("/blog")

      

       
      

    }catch(err){

        res.status(400).json({
            status: false,
            err : err.message
        })

    }


}

const postComment = async(req,res,err)=>{


    try{
       


        const {content} = req.body;
        
        const comments = await Blog.findByIdAndUpdate(
            {_id: req.params.id}, 
            {$push : {comments: {content: content, user:res.locals.user._id  } }},{new: true});

        





        res.status(200).redirect("/blog/" + req.params.id)

      

       
      

    }catch(err){

        res.status(400).json({
            status: false,
            err : err.message
        })

    }


}

const getPost = async(req,res,next)=>{


    try{

        


        res.status(200).render("post",{
            link : "post"
        });

      

       
      

    }catch(error){

        res.status(400).json({
            status: false,
            error
        })

    }


}



module.exports = {
    getBlog,
    createPost,
    getPost,
    getAPost,
    postComment
}