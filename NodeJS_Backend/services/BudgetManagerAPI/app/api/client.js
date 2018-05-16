const mongoose = require('mongoose'),
    utils = require('./utils');

const api = {};

api.store = (User, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);
        if (utils.checkEntity(user)) {
            const client = new Client({
                user_id: req.query.user_id,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            });
            utils.saveModel(res, client);            
        }
    })
}

api.getAll = (User, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    Client.find({ user_id: req.query.user_id }, (error, client) => utils.foundCallback(res, error, client));
}

api.index = (User, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);        
        if (utils.checkEntity(user)) 
            Client.findOne({ _id: req.query._id }, (error, client) => utils.foundCallback(res, error, client));        
    })
}

api.edit = (User, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);
        if (utils.checkEntity(user)) 
            Client.findOneAndUpdate({ _id: req.body._id }, req.body, (error, client) => utils.foundCallback(res, error, client));        
    })
}

api.remove = (User, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);

        if (utils.checkEntity(user)) {
            Client.remove({ _id: req.query._id }, (error, removed) => {
                if (error) res.status(400).json(error);
                res.status(200).json({ success: true, message: 'Removed successfully' });
            })
        }
    })
}

module.exports = api;