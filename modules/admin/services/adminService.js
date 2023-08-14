const mysqlConnection = require('./../../../databases/mysql'); 
const userService = require('../../user/services/userService');

// Function to fetch all logged-in users
async function getLoggedInUsers() {
  try {
    const query = 'SELECT id, username, email, created_at FROM users WHERE is_logged_in = 1';
    const results = await mysqlConnection.runQuery(query);
    return [false, results];
  } catch (error) {
    return [true, "Something went wrong"]
  }
}

async function revokeUserLogin({userId}) {
    try {
        let isLoggedIn = 0;
        await userService.updateLoggedInFlag({isLoggedIn, userId});
        await deleteAllTokens({userId});
        return [false, "Success"]
    } catch (error) {
        return [true, "Something went wrong"]
    }
}

async function deleteAllTokens({userId}) {
    try {
        const query = 'DELETE FROM user_login_tokens WHERE user_id = ?';
        await mysqlConnection.runQuery(query, [userId]);
        return [false, "Success"]
    } catch (error) {
        return [true, "Something went wrong"]
    }
}

module.exports = {
    getLoggedInUsers,
    revokeUserLogin
}