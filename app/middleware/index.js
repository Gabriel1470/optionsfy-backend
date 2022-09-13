const authJwt = require("./auth.middleware");
const verifySignUp = require("./signup.middleware");

module.exports = {
    authJwt,
    verifySignUp
};