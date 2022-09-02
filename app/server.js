const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db = require('../app/models')
const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// authenticate
db.sequelize.authenticate()
.then( () => {
    console.log('Server is correctly running ')
}).catch((err)=> {
  console.error("Unable to connect:",err.message);
});

// syncronize
db.sequelize.sync().then(()=>{
  console.log('Database syncronized');
}).catch((err)=>{
  console.error("Unable to syncronize:",err.message);
});

app.get("/", (req,res) => {
    res.send('<h1>Home</h1>')
    res.send.status(200)
})

require('../app/routes/auth.routes')(app)

app.listen(process.env.PORT,()=>{console.log(`[SERVER]:Server listen on port ${process.env.PORT}`)});