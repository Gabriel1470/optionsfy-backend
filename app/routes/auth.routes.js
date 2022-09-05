const regexSignup = require('../middleware/signup.middleware')
const regexSignin = require('../middleware/auth.middleware')
const controller = require('../controllers/sign.controller')

module.exports = function (app){
     app.use((req,res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
        );
        next()
    }); 
    
    
    app.post('/auth/signup',[regexSignup.dataAreExisting, regexSignup.agreementsAreAccepted, 
                            regexSignup.userAlreadyExist, regexSignup.emailIsCorrect, 
                            regexSignup.passwordRespectRegex],controller.signup)
    
    app.post('/auth/signin',[regexSignin.userExist,regexSignin.matchPassword],controller.signin)

};