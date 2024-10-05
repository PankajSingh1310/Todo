const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.token;

    if (!jwtToken) {
      res.redirect("/login");
    } else {
      const data = jwt.verify(jwtToken, process.env.JWT_KEY);
      req.user = data;
      next();
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = userAuthentication;
