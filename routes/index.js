const express = require("express");
const {  getLogin, getRegister, Logout, getContactPage, sendMail, getIndex, gallery } = require("../controllers/pageControllers");
const { checkUser } = require("../middlewares/authMiddleware");
const photo = require("./photo");
const user = require("./user");
const blog = require("./blog");



const router = express.Router();

router.use("*", checkUser)




router.route("/").get(getIndex); 
router.route("/register").get(getRegister); 
router.route("/login").get(getLogin); 
router.route("/logout").get(Logout); 
router.route("/contact").get(getContactPage);
router.route("/contact").post(sendMail);
router.route("/gallery").get(gallery);


// Other Routes   

router.use("/photos", photo);
router.use("/users", user);
router.use("/blog", blog)













module.exports = router