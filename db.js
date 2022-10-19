const mongoose = require('mongoose');


const connectDatabase = () => {


mongoose.connect(process.env.DB_URI, {
    dbName: "lenslight",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Connected to the DB succesfully"))
.catch(err => console.log(`DB connection err: ${err}`));

}

module.exports = connectDatabase;

 
 

 