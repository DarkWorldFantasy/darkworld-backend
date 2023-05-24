const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1].trim();
    req.user = jwt.verify(token, process.env.SECRETKEY);
    next();
};
