const express = require("express");
const dotenv = require("dotenv")
const routes = require("./routes");
const connectDatabase = require("./db");
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")
const {v2} = require("cloudinary")
const methodOverride = require("method-override")

dotenv.config();

v2.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.ClOUD_API_KEY,
    api_secret : process.env.ClOUD_API_SECRET

})

connectDatabase(); // dotenv altında olması şart

const app = express();


const port = process.env.PORT;


// ejs template

app.set("view engine", "ejs");


// Static Files Middleware

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // sayfa yüklenmezse
app.use(cookieParser())
app.use(fileUpload({useTempFiles: true}));
app.use(methodOverride('_method',{
    methods: ['POST', 'GET']
})); 





// Router

app.use("/", routes);









app.listen(port, ()=>{

    console.log(`Application running on port: ${port}`);
    

});

 