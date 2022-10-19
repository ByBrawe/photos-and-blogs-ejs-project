const Photo = require("../models/Photo");
const {v2} = require("cloudinary")
const fs = require("fs");



const createPhoto = async(req,res,err) => {


    const upload = await v2.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename : true,
            folder : "lenslight"
        }
    )

    try{

      const {name, description} = req.body;  
    
      const photo = await Photo.create({ 
        name,
        description,
        user : res.locals.user._id, 
        url : upload.secure_url,
        image_id : upload.public_id
      });
      
 

      fs.unlinkSync(req.files.image.tempFilePath)

      res.status(201).redirect("/users/dashboard")



    }catch(error){ 
        res.status(400).json({
            status : false,
            error
        })
    }

    

};

const getAllPhotos = async(req,res,err) => {

    const photos = await Photo.find(res.locals.user && {user : {$ne : res.locals.user._id}});

    res.render("photos", {
        link : "photos",
        photos
    });

};

const getAPhotos = async(req,res,err) => {

    const id = req.params.id

    const photo = await Photo.findById({_id : id}).populate("user");

    let isOwner = false;

    if(res.locals.user){
        isOwner = photo.user.equals(res.locals.user._id)
    }


    res.render("photo", {
        link : "photo",
        photo ,
        isOwner
        
    });

};

const deletePhoto = async(req,res,err) => {


    

    try{    

        const photo = await Photo.findById({_id : req.params.id});

        const photoId = photo.image_id

        v2.uploader.destroy(photoId);

        await Photo.findByIdAndRemove({_id : req.params.id})





        res.status(200).redirect(`/users/dashboard`);

      


    }catch(error){ 
        res.status(400).json({
            status : false,
            error
        })
    }

    

};

const updatePhoto = async(req,res) => {


    

    try{

        const photo = await Photo.findById(req.params.id)

        if(req.files){

            const photoId = photo.image_id;
            await v2.uploader.destroy(photoId);

            const upload1 = await v2.uploader.upload(req.files.image.tempFilePath,{
                use_filename : true,
                folder: "lenslight"
            })

            photo.url = upload1.secure_url;
            photo.image_id = upload1.public_id

            fs.unlinkSync(req.files.image.tempFilePath); // tmp dosyasınındaki veriyi siler 
        } 

        photo.name = req.body.name
        photo.description = req.body.description;

        photo.save();
      
        res.status(200).redirect(`/photos/${req.params.id}` );



    }catch(error){ 
        res.status(400).json({
            status : false,
            error 
        })
    }

    

};

module.exports = {
    createPhoto,
    getAllPhotos, 
    getAPhotos,
    deletePhoto,
    updatePhoto
}