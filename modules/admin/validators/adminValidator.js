const Joi = require('joi');

exports.revokeUserLogin = function(req, res, next) {

    let schema = Joi.object({
        user_id : Joi.number().required()
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
