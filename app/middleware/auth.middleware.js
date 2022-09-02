const { Sequelize }= require("sequelize");
const db = require("../models");
const dotenv = require("dotenv");
const user = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.userExist = (req,res,next) =>{
user.findOne({
  where: {
    email: req.body.email
  }
}).then(data => {
  if(data) {next()}
  else {res.status(400).send({message:"failed"})};
}).catch(err=>console.log(err))
}

exports.matchPassword = async(req,res,next)=> {
  const checkUser = await user.findOne({where:{email:req.body.email}})
  if(checkUser && await bcrypt.compare(req.body.password, checkUser.password)) {next()}
  else { {res.status(400).send({message:"failed"}) }}
}

exports.verifyToken = async(req,res,next)=>{
  const token=(req.headers.authorization.split(' ')[1])
  try{
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const checkUser = await user.findOne({where: {email: decoded.email, password: decoded.password}})
    if(checkUser)
    {next()}
    else{
      res.status(400).send({"error":"token not valid"})
    }
  }
  catch(err){console.log(err.message)}
}

