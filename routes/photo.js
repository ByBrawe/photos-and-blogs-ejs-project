const express = require("express");
const { getAllPhotos, createPhoto,getAPhotos,updatePhoto,deletePhoto } = require("../controllers/photoControllers");



const router = express.Router();




router.route("/").get(getAllPhotos).post(createPhoto)
router.route("/:id").get(getAPhotos)
router.route("/:id").put(updatePhoto)
router.route("/:id").delete(deletePhoto)










module.exports = router