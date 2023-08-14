const adminServices = require('../services/adminService')

exports.getLoggedInUsers = getLoggedInUsers;
exports.revokeUserLogin  = revokeUserLogin

async function getLoggedInUsers() {
    return await adminServices.getLoggedInUsers();
}

async function revokeUserLogin(payload) {
    let userId = payload.user_id;
    return await adminServices.revokeUserLogin({userId});
}
