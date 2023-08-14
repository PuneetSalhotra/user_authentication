const userController = require('../controllers/adminController')

exports.getLoggedInUsers = async function (req, res) {
    let[err, response] = await userController.getLoggedInUsers();
    if(err) {
        return res.json({ statusCode : 400, message :"Failed", data : {}})
    }
    res.json({ statusCode : 200, message :"Success", data : response})
}

exports.revokeUserLogin = async function (req, res) {
    let[err, response] = await userController.revokeUserLogin(req.body);
    if(err) {
        return res.json({ statusCode : 400, message :"Failed", data : {}})
    }
    res.json({ statusCode : 200, message :"Success", data : response})
}