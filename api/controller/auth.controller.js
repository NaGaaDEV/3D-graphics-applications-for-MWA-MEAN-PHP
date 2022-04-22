const jwt = require("jsonwebtoken");
const util = require("util");

const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});

module.exports.authenticate = function(req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        jwtVerifyPromise(token, process.env.JWT_PASSWORD)
        .then(() => next())
        .catch(err => invalidAuthToken(err))
    } else {
        res.status(401).json({message: process.env.MSG_UNAUTHORIZED})
    }
    const invalidAuthToken = (err) => {
        res.status(401).json({message: err})
    }
}