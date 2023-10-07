const validator = require('../helpers/validate');

const saveFriend = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "email": "required|email",
        "age": "required|string",
        "favoriteNumber": "required|string",
        "occupation": "required|string",
        "phoneNumber": "string"
}

validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: err
            });
    } else {
        next();
    }
   });
};

const saveCar = (req, res, next) => {
    const validationRule = {
        "make": "required|string",
        "model": "required|string",
        "color": "required|string",
  
}

validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: err
            });
    } else {
        next();
    }
   });
};

module.exports = {
 saveFriend,
 saveCar
};
