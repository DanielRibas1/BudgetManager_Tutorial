const utils = {}

utils.authorize = (res, Token) => {
    if (!Token) 
        res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
}

utils.checkEntity = (entity, err) => {    
    if (!entity) {
        const message = err;
        if (!message) 
            message = `Invalid ${typeof (entity)}`;  
        res.status(400).json({ success: false, message: message });
        return false;
    }
    return true;
}

utils.foundError = (res, error) => {
    if (error) res.status(400).json(error);
}

utils.saveModel = (res, model) => {
    model.save(error => {
        utils.foundError(res, error);
        res.status(200).json({ success: true, message: `${typeof(model)} registered successfully` });
    })
}

utils.foundCallback = (res, error, found) => {
    utils.foundError(res, error);
    res.status(200).json(found);
    return true;
}

module.exports = utils;