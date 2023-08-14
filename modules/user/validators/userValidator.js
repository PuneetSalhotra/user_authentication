const Joi = require('joi');

exports.userLogin = function(req, res, next) {

    let schema = Joi.object({
        email : Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().required()

    })

    let response = schema.validate(req.body)

    if(!response.error) {
        return next();
    }

    res.json({
        statusCode : 400,
        message : "Invalid request params",
        data : {}
    });
}

exports.signup = function(req, res, next) {

    let schema = Joi.object({
        username : Joi.string().required(),
        password : Joi.string().required(),
        email : Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    let response = schema.validate(req.body)

    if(!response.error) {
        return next();
    }

    res.json({
        statusCode : 400,
        message : "Invalid request params",
        data : {}
    });
}