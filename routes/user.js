const express = require("express");
const { createUser, login, getDashboardPage, getAllUsers, getAUser, follow, unFollow } = require("../controllers/userControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");



const router = express.Router();




router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/dashboard").get(authenticateToken,getDashboardPage);
router.route("/").get(authenticateToken,getAllUsers)
router.route("/:id").get(authenticateToken,getAUser)
router.route("/:id/follow").put(authenticateToken,follow)
router.route("/:id/unfollow").put(authenticateToken,unFollow)











module.exports = router