const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = mongoose.model(process.env.USER_MODEL);

module.exports.register = function(req, res) {
    if(req.body && req.body.name && req.body.username && req.body.password) {
        bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, salt) => generatePasswordHash(err, salt));
        const generatePasswordHash = (err, salt) => {
            if(err) respondRejected({message: err});
            else bcrypt.hash(req.body.password, salt, (err, passwordHash) => createUser(err, passwordHash));
        }
        const createUser = (err, passwordHash) => {
            if(err) respondRejected({message: err});
            else {
                const newUser = {
                    name: req.body.name,
                    username: req.body.username,
                    password: passwordHash
                }
                userModel.create(newUser).then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
            }
        }
        const respondResolved = (result) => res.status(201).json(result);
        const respondRejected = (err) => res.status(500).json({message: err});
    } else {
        res.status(400).json({message: process.env.MSG_NAME_USERNAME_PASSWORD_REQUIRED})
    }
}

module.exports.login = function(req, res) {
    if(req.body && req.body.username && req.body.password) {
        userModel.findOne({username: req.body.username})
        .then(user => checkPassword(user))
        .catch(err => respondRejected(err, 404));
    } else {
        res.status(400).json({message: process.env.MSG_USERNAME_PASSWORD_REQUIRED})
    }
    const checkPassword = (user) => {
        bcrypt.compare(req.body.password, user.password, (err, match) => authorizeLogin(err, match, user.name))
    }
    const authorizeLogin = (err, match, nameOfUser) => {
        if(err) respondRejected(err, 500)
        else {
            if(match) {
                const token = jwt.sign({name: nameOfUser}, process.env.JWT_PASSWORD, {expiresIn: 3600});
                respondResolved({success: true, token: token})
            } else {
                respondRejected({message: process.env.MSG_PASSWORD_INCORRECT}, 401);
            }
        }
    }
    const respondResolved = (result) => res.status(200).json(result);
    const respondRejected = (err, status) => res.status(status).json({message: err});
}