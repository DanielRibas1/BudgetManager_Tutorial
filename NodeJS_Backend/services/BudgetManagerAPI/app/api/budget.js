const mongoose = require('mongoose'),
    utils = require('./utils');

const api = {};

api.store = (User, Budget, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    Client.findOne({ _id: req.body.client }, (error, client) => {
        utils.foundError(res, error);

        if (utils.checkEntity(client)) {     

            const budget = new Budget({
                client_id: req.body.client,
                user_id: req.query.user_id,
                client: client.name,
                state: req.body.state,
                title: req.body.title,
                description: req.body.description,
                total_price: req.body.total_price,
                items: req.body.items
            });

            utils.saveModel(res, budget);
        }
    })
}

api.getAll = (User, Budget, Token) => (req, res) => {
    utils.authorize(res, Token);
    Budget.find({ user_id: req.query.user_id }, (error, budget) => utils.foundCallback(res, error, budget));   
}

api.getAllFromClient = (User, Budget, Token) => (req, res) => {
    utils.authorize(res, Token);
    Budget.find({ client_id: req.query.client_id }, (error, budget) => utils.foundCallback(res, error, budget));    
}

api.index = (User, Budget, Client, Token) => (req, res) => {
    utils.authorize(res, Token);

    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);
        if (utils.checkEntity(user))
            Budget.findOne({ _id: req.query._id }, (error, budget) => utils.foundCallback(res, error, budget));                
    })
}

api.edit = (User, Budget, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);
        if (utils.checkEntity(user))
            Budget.findOneAndUpdate({ _id: req.body._id }, req.body, (error, budget) => utils.foundCallback(res, error, budget));
    })    
}

api.getByState = (User, Budget, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    User.findOne({ _id: req.query.user_id }, (error, user) => {
        utils.foundError(res, error);
        if (utils.checkEntity(user))
            Budget.find({ state: req.query.state }, (error, budget) => utils.foundCallback(res, error, budget));
    })
}

api.remove = (User, Budget, Client, Token) => (req, res) => {
    utils.authorize(res, Token);
    Budget.remove({ _id: req.query._id }, (error, removed) => {
        utils.foundError(res, error);
        res.status(200).json({ success: true, message: 'Removed successfully' });
    })
}

module.exports = api;