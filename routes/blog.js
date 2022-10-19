const express = require("express");
const { getBlog,createPost,getPost,getAPost,postComment } = require("../controllers/blogControllers");

const { authenticateToken } = require("../middlewares/authMiddleware");



const router = express.Router()





router.route("/").get(getBlog)
router.route("/post").post(authenticateToken,createPost)
router.route("/post").get(authenticateToken,getPost)
router.route("/:id").get(getAPost)
router.route("/:id/comment").post(authenticateToken,postComment)






module.exports = router;
