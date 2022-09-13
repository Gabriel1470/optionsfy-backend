const dotenv = require ("dotenv").config()
module.exports={
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: process.env.DB_PASSWORD,
    DB:'optionsfy',
    dialect:'mysql',
    pool:{
        max:3,
        min:0,
        acquire:30000,
        idle:10000
    }
}
