const User = require("../models/User");
const jwt = require("jsonwebtoken");


const checkUser = async (req, res, next) => {
       
    const token = req.cookies.jwt;


    try{


        if(token){

            jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decodedToken)=>{
                if(err){
                    console.log(err)
                    res.locals.user = null;
                    next()

                }else{
                    const user = await User.findById(decodedToken.userId);
                    res.locals.user = user;
                    next(); 
                }
            })

        }else{
            res.locals.user = null;
            next()
        }




        
    }catch (error) {

        res.status(401).json({
            success: false,
            error: "Not authorized"

    })};


};

 

const authenticateToken = async (req, res, next) => {

    try {

    const token = req.cookies.jwt;


    if(token){

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err)=>{
            if(err){
                console.log(err.message);
                res.redirect("/login")
            }else{
                next();
            }
        })

    }else{

        res.redirect("/login")

    }




    //     const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]; // if else kısa yol ?: sadece if ise &&


    //    if(!token){
    //        return res.status(401).json({

    //            success : false,
    //            err : "No token available"

    //        });
    //     }
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;


    //     req.user = await User.findById(decoded);
        
    //     next()


    }catch (error) {

        res.status(401).json({
            success: false,
            error: "Not authorized"
        });

}





}


module.exports = {authenticateToken,checkUser}