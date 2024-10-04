const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
    const jwtToken = req.cookies.token;

    if(!jwtToken){
        res.redirect("/login");
    }

    else{
        const data = jwt.verify(jwtToken, "secretkey");
        req.user = data;
        next();
    }
}   

module.exports = userAuthentication;