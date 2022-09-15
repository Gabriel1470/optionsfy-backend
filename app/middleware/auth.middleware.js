//const { Sequelize } = require("sequelize");
const db = require('../models')
const user = db.user;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");


verifyToken = (req, res, next) => {
    let token = req.header["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userEmail = decoded.email;
        next();
    });
};

userExist=(req,res,next)=>{
    console.log(req.body)
        user.findOne({
            where:{
                email: req.body.email
            }
        }).then(data=>
            {
                if(data){ next()}
                else{res.status(400).send({message:"AUTH1.1 - Failed"})}
            }
            ).catch(err=>console.log(err))
}


const authJwt = {
    verifyToken: verifyToken,
    userExist: userExist,
};

module.exports = authJwt;