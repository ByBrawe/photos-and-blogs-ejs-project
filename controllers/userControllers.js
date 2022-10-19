const User = require("../models/User");
const Photo = require("../models/Photo");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user: user._id });
      
  
    } catch (error) {
      console.log('ERROR', error);
  
      let errors2 = {};
  
      if (error.keyPattern["username"] === 1) {
        errors2.username = 'The Username is already registered';
      }
      if (error.keyPattern["email"] === 1) {
        errors2.email = 'The Email is already registered';
      }
  
      if (error.name === 'ValidationError') {
        Object.keys(error.errors).forEach((key) => {
          errors2[key] = error.errors[key].message;
        });
      }
  
      console.log('ERRORS2:::', errors2);
  
      res.status(400).json(errors2);
    }
  }; 



const login = async (req, res, next) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        let checkPassword = false;

        if (user) {

            checkPassword = await bcrypt.compare(password, user.password);

        } else {

            return res.status(401).json({
                status: false,
                message: "There is no such user"
            })
        }


        if (checkPassword) {

            const token = createToken(user._id);

            res.cookie("jwt", token, {
                httponly: true,
                maxAge: 1000 * 60 * 60 * 24
            })


            res.redirect("/users/dashboard");

        } else {

            res.status(401).json({
                status: false,
                message: "Check your password"
            })
        }




    } catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }



};

const createToken = (userId) => {

    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })



}


const getDashboardPage = async(req, res, next) => {

    const photos = await Photo.find({ user: res.locals.user._id });

    res.render("dashboard", {
        link : "dashboard",
        photos
    });



};


const getAllUsers = async (req, res, next) => {

    try {

        const users = await User.find({_id : {$ne : res.locals.user._id}});


        res.status(200).render("users", {
            users,
            link : "users"
        })


        

    } catch (error) {
        res.status(400).json({
            status: false,
            error
        })
    }



};



const getAUser = async (req, res, next) => {

    try {

        const user = await User.findById({_id : req.params.id});
        const photos = await Photo.find({user: req.params.id})

        const inFollowers = user.followers.some((follower)=>{
            return follower.equals(res.locals.user._id)
        })


        res.status(200).render("user",
        {
            user,
            inFollowers,
            link : "user",
            photos
        }
        );


    } catch (error) {
        // res.status(400).redirect("/login")
        res.status(400).json({
            error
        })
    }



};

const follow = async (req, res) => {

    try {
  
      let user = await User.findByIdAndUpdate(
        {_id : req.params.id},
        {$push : {followers: res.locals.user._id}},  
        {new: true}
      );
        
      user = await User.findByIdAndUpdate(
        {_id : res.locals.user._id},
        {$push : {followings : req.params.id}},
        {new: true}
      );

      


      res.status(200).redirect(`/users/${req.params.id}`)

  
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  
  
  }
const unFollow = async (req, res) => {

    try {
  
      let user = await User.findByIdAndUpdate(
        {_id : req.params.id},
        {$pull : {followers: res.locals.user._id}},  
        {new: true}
      );
        
      user = await User.findByIdAndUpdate(
        {_id : res.locals.user._id},
        {$pull : {followings : req.params.id}},
        {new: true}
      );

      res.status(200).redirect(`/users/${req.params.id}`)

  
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  
  
  }




module.exports = {

    createUser,
    login,
    getDashboardPage,
    getAllUsers,
    getAUser,
    follow,
    unFollow

}