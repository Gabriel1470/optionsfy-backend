//const { Sequelize } = require("sequelize");
const db = require('../models/')
const user = db.user;

  
dataAreExisting=(req,res,next)=> {
    if ((req.body.username, req.body.email, req.body.password, req.body.agreement)) {
      next()
    } else {
      res.status(400).send({message: "SIGN1 - Failed"})
    }
  }

agreementsAreAccepted=(req,res,next)=> {
    if (req.body.agreement === true) {
     next()
    } else res.status(400).send({message:"SIGN2 - Failed"});
  
  }

PasswordRespectRegex=(req,res,next)=> {
    const password = [...req.body.password];
    let intPasswordVerify = false;
    let specialSignVerify = false;
    let charAlphabetVerify = false;
    const charAlphabet = [..."ABCDEFGHIJKLMNOPQRSTUVXYZ"];
    const specialSign = [..."!£$%&/()=?'ì_.;°çé°§*é|:@°#{[}]"];
    const intPassword = [..."1234567890"];

    for (let i = 0; i < password.length; i++) {
      for (let j = 0; j < specialSign.length; j++) {
        //console.log(password[i],specialSign[j])
        if (password[i] === specialSign[j]) {
          specialSignVerify = true;
        }
      }
    }

    if (!specialSignVerify) {
      res.status(400).send({message:"SIGN4.1: failed"});
    }

    for (let i = 0; i < password.length; i++) {
      for (let j = 0; j < charAlphabet.length; j++) {
         if (password[i] === charAlphabet[j]) {
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

emailIsCorrect=(req,res,next)=> {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const regexEmail = req.body.email.match(pattern);
    if (regexEmail) {
      next()
    }
    else{
      console.log(regexEmail)
      res.status(400).send({message:"SIGN3: failed"});
    }
  }

userAlreadyExist=(req,res,next)=>{
    user.findOne({ where: { email: req.body.email } })
        .then(data=>{
          if(data!==null){
            res.status(400).send({message:"SIGN5: failed"})
          } else{
            next()
          }
        })
        .catch(err=>console.log(err))
}

const verifySignup = {
  dataAreExisting: dataAreExisting,
  agreementsAreAccepted: agreementsAreAccepted,
  PasswordRespectRegex: PasswordRespectRegex,
  emailIsCorrect: emailIsCorrect,
  userAlreadyExist: userAlreadyExist
};

module.exports = verifySignup;