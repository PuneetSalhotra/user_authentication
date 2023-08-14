const userController = require('../controllers/userController')


exports.signup = async function (req, res) {
    let[err, response] = await userController.signup(req.body);
    if(err) {
        return res.json({ statusCode : 400, message : response, data : {}})
    }
    res.json({ statusCode : 200, message :"Sucess", data : response})
}

exports.userLogin = async function (req, res) {
    let[err, response] = await userController.userLogin(req.body);
    if(err) {
        return res.json({ statusCode : 400, message :response, data : {}})
    }
    req.session.token = response.token
    res.json({ statusCode : 200, message :"Sucess", data : response})
}