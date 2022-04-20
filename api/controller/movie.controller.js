const mongoose = require("mongoose");

const app = mongoose.model(process.env.APP_MODEL);

module.exports.getAll = function(req, res) {
    const response = { status: 200, message: ""};
    const appId = req.params.appId;
    if(!appId) {
        response.status = 400;
        response.message = {message: process.env.MSG_APP_ID_REQUIRED};
    } else if(!mongoose.isValidObjectId(appId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_APP_ID};
    }

    const respondResolved = (result) => res.status(200).json(result);
    const respondRejected = (err) => res.status(500).json({message: err});

    if(response.status == 200) {
        app.findById(appId).select("movies").exec().then((resolve) => respondResolved(resolve.movies)).catch((reject) => respondRejected(reject));
    } else {
        res.status(response.status).json({message: response.message});
    }   
}

module.exports.getOne = function(req, res) {
    const response = { status: 200, message: ""};
    const appId = req.params.appId;
    const movieId = req.params.movieId;
    if(!appId) {
        response.status = 400;
        response.message = {message: process.env.MSG_APP_ID_REQUIRED};
    } else if(!movieId) {
        response.status = 400;
        response.message = {message: process.env.MSG_MOVIE_ID_REQUIRED};
    } else if(!mongoose.isValidObjectId(appId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_APP_ID};
    } else if(!mongoose.isValidObjectId(movieId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_MOVIE_ID};
    }

    const respond = () => res.status(response.status).json(response.message);
    
    const respondResolved = (result) => {
        if (!result || !result.id(movieId)) {
            response.status = 404;
            response.message = {message: process.env.MSG_MOVIE_NOT_FOUND};
        } else {
            response.message = result.id(movieId);
        }
        respond();
    }
    const respondRejected = (err) => {
        response.status = 500;
        response.message = {message: err};
        respond();
    }
    if(response.status == 200) {
        app.findById(appId).select("movies").exec().then((resolve) => respondResolved(resolve.movies)).catch((reject) => respondRejected(reject));
    } else {
        respond();
    }
}