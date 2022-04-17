const mongoose = require("mongoose");

const app = mongoose.model(process.env.APP_MODEL);

module.exports.getAll = function(req, res) {
    let count = parseInt(process.env.DEFAULT_FIND_COUNT);
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
    count = parseInt(req.query.count) < 10 ? parseInt(req.query.count) : count;
    offset = parseInt(req.query.offset) > 0 ? parseInt(req.query.offset) : offset;

    let query = req.query.name ? {name: req.query.name } : {};

    const respondResolved = (result) => res.status(200).json(result);
    const respondRejected = (err) => res.status(500).json({message: err});
    app.find(query).skip(offset).limit(count).exec().then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
}

module.exports.getOne = function(req, res) {
    const response = { status: 200, message: ""};
    const appId = req.params.appId;
    if(!appId) {
        response.status = 400;
        response.message = {message: process.env.MSG_APP_ID_REQUIRED};
    } else if(!mongoose.isValidObjectId(appId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_APP_ID};
    }
    
    const respond = () => res.status(response.status).json(response.message);
    
    const respondResolved = (result) => {
        if (!result) {
            response.status = 404;
            response.message = {message: process.env.MSG_APP_NOT_FOUND};
        } else {
            response.message = result;
        }
        respond();
    }
    const respondRejected = (err) => {
        response.status = 500;
        response.message = {message: err};
        respond();
    }
    if(response.status == 200) {
        app.findById(appId).exec().then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
    } else {
        respond();
    }
}

module.exports.addOne = function(req, res) {
    if(req.body && req.body.name) {
        const respondResolved = (result) => res.status(201).json(result);
        const respondRejected = (err) => res.status(500).json({message: err});
        app.create(req.body).then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
    } else {
        res.status(400).json({message: process.env.MSG_APP_NAME_REQUIRED})
    }
}

module.exports.replaceOne = function(req, res) {
    const response = { status: 200, message: ""};
    const appId = req.params.appId;
    if(!appId) {
        response.status = 400;
        response.message = {message: process.env.MSG_APP_ID_REQUIRED}
    } else if(!mongoose.isValidObjectId(appId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_APP_ID}
    }

    const respond = () => res.status(response.status).json(response.message);

    const respondResolved = (result) => {
        response.status = 200;
        response.message = result;
        respond();
    }
    const respondRejected = (err) => {
        response.status = 500;
        response.message = {message: err};
        respond();
    }
    if(response.status == 200) {
        app.findOneAndReplace(appId, req.body, {new: true}).exec().then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
    } else {
        respond();
    }
}

module.exports.updateOne = function(req, res) {
    const response = { status: 200, message: ""};
    const appId = req.params.appId;
    if(!appId) {
        response.status = 400;
        response.message = {message: process.env.MSG_APP_ID_REQUIRED}
    } else if(!mongoose.isValidObjectId(appId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_APP_ID}
    }
    
    const respond = () => res.status(response.status).json(response.message);
    
    const respondResolved = (result) => {
        response.status = 200;
        response.message = result;
        respond();
    }
    const respondRejected = (err) => {
        response.status = 500;
        response.message = {message: err};
        respond();
    }
    if(response.status == 200) {
        if(req.body._id) { delete req.body._id; }
        app.findByIdAndUpdate(appId, req.body, {new: true}).exec().then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
    } else {
        respond();
    }
}

module.exports.deleteOne = function(req, res) {
    const response = { status: 200, message: ""};
    const appId = req.params.appId;
    if(!appId) {
        response.status = 400;
        response.message = {message: process.env.MSG_APP_ID_REQUIRED}
    } else if(!mongoose.isValidObjectId(appId)) {
        response.status = 400;
        response.message = {message: process.env.MSG_INVALID_APP_ID}
    }

    const respond = () => res.status(response.status).json(response.message);
    
    const respondResolved = (result) => {
        if (!result) {
            response.status = 404;
            response.message = {message: process.env.MSG_APP_NOT_FOUND};
        } else {
            response.status = 204;
            response.message = result;
        }
        respond();
    }
    const respondRejected = (err) => {
        response.status = 500;
        response.message = {message: err};
        respond();
    }
    if(response.status == 200) {
        app.findByIdAndDelete(appId).exec().then((resolve) => respondResolved(resolve)).catch((reject) => respondRejected(reject));
    } else {
        respond();
    }
}