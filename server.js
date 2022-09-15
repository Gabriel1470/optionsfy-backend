require("dotenv").config();
const express = require('express');
const cors = require ('cors');

const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// Database
const db = require('./app/models')


db.sequelize.authenticate()
    .then(()=>{
        console.log("Connection has been enstablished successfully");
    })
    .catch((error)=>{
        console.error("Unable to enstabling a connection: ",error.message)
    })

db.sequelize.sync()
    .then(() => {
        console.log('DB Syncronized');
    })
    .catch((error) => {
        console.error('Unable to syncronize DB : ', error);
    });


// simple rule
 app.get('/',(req,res)=>{
     res.sendStatus(200)
     res.send('<h1>Welcome to backend OptionSfy</h1>')
 })


// routes
require('./app/routes/auth.routes')(app)

// set port, listen for requests
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
});


//module.exports={app}