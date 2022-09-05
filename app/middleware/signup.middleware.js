const { Sequelize } = require("sequelize");
const db = require('../models/');
const user = db.user;

exports.dataAreExisting = (req,res,next) => {
  if ((req.body.username,
    req.body.email,
    req.body.password,
    req.body.agreement)){
      next()
    } else {
      res.status(400).send({message: "Unauthorized!"})
    }
}

exports.agreementsAreAccepted = (req,res,next) => {
  if (req.body.agreement === true){
    next()
  }else res.status(400).send({message: "Not accepted!"})
}

exports.passwordRespectRegex = async (req,res,next) => {
  const password = [...req.body.password];
  let intPasswordVerify = false;
  let specialSignVerify = false;
  let charAlphabetVerify = false;
  const charAlphabet = [..."ABCDEFGHIJKLMNOPQRSTUVXYZ"];
  const specialSign = [..."!£$%&/()=?'ì_.;°çé°§*é|:@°#{[}]"];
  const intPassword = [..."1234567890"];

  for (let i = 0; i < password.length; i++) {
    for (let j = 0; j < specialSign.length; j++) {
      /*         console.log(password[i],specialSign[j])
       */ if (password[i] === specialSign[j]) {
        specialSignVerify = true;
      }
    }
  }

  if (!specialSignVerify) {
    res.status(400).send({message:"SIGN4.1: failed"});
  }

  for (let i = 0; i < password.length; i++) {
    for (let j = 0; j < charAlphabet.length; j++) {
      /*         console.log(password[i],charAlphabet[j])
       */ if (password[i] === charAlphabet[j]) {
        charAlphabetVerify = true;
      }
    }
  }

  if (!charAlphabetVerify) {
    res.status(400).send({message:"SIGN4.2: failed"});
  }

  for (let i = 0; i < password.length; i++) {
    for (let j = 0; j < intPassword.length; j++) {
      /*         console.log(password[i],intPassword[j])
       */ if (password[i] === intPassword[j]) {
        intPasswordVerify = true;
      }
    }
  }

  if (!intPasswordVerify) {
    res.status(400).send({message:"SIGN4.3: failed"});
  }
if(intPasswordVerify && charAlphabetVerify && specialSignVerify){
next()
}

}

exports.emailIsCorrect = (req,res,next) => {
  const pattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const regexEmail = req.body.email.match(pattern);
  if (regexEmail) {
    next()
  }else{
    console.log(regexEmail)
    res.status(400).send({message:"Email is not valid!"})
  }
}

exports.userAlreadyExist = (req,res,next) => {
  user.findOne({where: {email:req.body.email}}).then(data=>{
    if(data!==null){
      res.status(400).send({message:"User alredy exist"})
    }
    else{
      next()
    }
  }).catch(err=>console.log(err))
} 