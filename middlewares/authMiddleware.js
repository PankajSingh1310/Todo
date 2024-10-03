const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
    const jwtToken = req.cookies.token;

    if(jwtToken === ""){
        // return res.redirect("/api/user/login");
        return res.send("no cookie found");
    }

    else{
        const data = jwt.verify(jwtToken, "secretKey");
        req.user = data;
        next();
    }
}

module.exports = userAuthentication;