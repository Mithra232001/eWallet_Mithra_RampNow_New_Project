const jwt = require("jsonwebtoken");


//jwt token
module.exports.authentication = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
