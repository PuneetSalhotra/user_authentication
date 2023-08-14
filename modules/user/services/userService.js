const utilFunctions  = require('../../../utils/utilFunctions');
const { runQuery, query } = require("../../../databases/mysql");


async function insertNewUser({username, email, password}) {
    try {
      const hashedPassword = await utilFunctions.hashPassword(password);
  
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      const userResult = await runQuery(query, [username, email, hashedPassword]);
  
      return { success: true, userId : userResult.insertId };
    } catch (error) {
      console.error('Error in inserting new user:', error);
      return { success: false, error: 'An error occurred while inserting new user' };
    }
}

async function fetchUserByEmailOrUsername({email, username}) {
  try {

    const query = 'SELECT username, email from users where email = ? OR username = ? ';
    const userResult = await runQuery(query, [email, username]);

    return userResult;
  } catch (error) {
    console.error('Error in fetchUserByEmail:', error);
    return { success: false, error: 'An error occurred while inserting new user' };
  }
}

async function fetchPasswordByEmail({email}) {
  try {

    const query = 'SELECT password from users where email = ? ';
    const userResult = await runQuery(query, [email]);

    return userResult[0].password;
  } catch (error) {
    console.error('Error in fetchUserByEmail:', error);
    return { success: false, error: 'An error occurred while inserting new user' };
  }
}

async function fetchUserByUsername({email}) {
  try {

    const query = 'SELECT username, email from users where username = ? ';
    const userResult = await runQuery(query, [email]);

    return userResult;
  } catch (error) {
    console.error('Error in fetchUserByUsername:', error);
    return { success: false, error: 'An error occurred while fetchUserByUsername' };
  }
}

async function fetchUser({email }) {
    try {
  
      const query = 'SELECT id, username, email, created_at from users where email = ?';
      const userResult = await runQuery(query, [email]);

      return userResult;
    } catch (error) {
      console.error('Error in inserting new user:', error);
      return { success: false, error: 'An error occurred while inserting new user' };
    }
}

async function updateLoggedInFlag({isLoggedIn, userId}) {
    try {
  
      const query = 'UPDATE users SET is_logged_in = ? WHERE id = ?';
      const userResult = await runQuery(query, [isLoggedIn, userId]);

      return userResult;
    } catch (error) {
      console.error('Error in update user:', error);
      return { success: false, error: 'An error occurred in update user' };
    }
}

async function insertLoginToken(userId, deviceType, token) {
    try {
        const insertTokenQuery = 'INSERT INTO user_login_tokens (user_id, device_type, token) VALUES (?, ?, ?)';
        await runQuery(insertTokenQuery, [userId, deviceType, token]);

        return { success: true };
    } catch (error) {
        console.error('Error in inserting login token:', error);
        return { success: false, error: 'An error occurred while inserting login token' };
    }
}

async function checkIfUserIsValid({email, password}) {
  try {
    let hashPassword = await fetchPasswordByEmail({ email });

    let result = await utilFunctions.comparePassword(password, hashPassword)
    console.log(result);
    if(result) {
      let loginToken = utilFunctions.createToken({email});
      return loginToken;
    }
    return false
  } catch(e) {
    return false;
  }
}
  
module.exports = {
    insertNewUser,
    insertLoginToken,
    fetchUser,
    updateLoggedInFlag,
    fetchUserByUsername,
    checkIfUserIsValid
}
  
  