const dotenv = require ("dotenv").config()
module.exports={
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: process.env.DB_PASSWORD,
    DB:'deploy',
    dialect:'postgres',
    pool:{
        max:3,
        min:0,
        acquire:30000,
        idle:10000
    }
}
