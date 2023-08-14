const userService = require('../services/userService')


async function signup(payload) {
    try {
        const { username, email, password } = payload;

        const checkIfUserExists = await userService.fetchUserByEmail({email, username});
        
        if(checkIfUserExists.length) {
            return [true, "Duplicate user"];
        }

        const result = await userService.insertNewUser({ username, email, password });

        if(result.success) {
            return [false, "Success"];
        }
        
        return [true, result.message];

    } catch(e) {
        console.log("Error, ", e.stack);
        // return [true, "Failure"];
    }
}

async function userLogin(payload) {
    try {
        let {email, password } = payload;
        const result = await userService.checkIfUserIsValid({ email, password });

        if (result) {

            const userDetails = await userService.fetchUser({ email });
            // Insert login details into user_login_tokens table
            const userId = userDetails[0].id
            const insertTokenResult = await userService.insertLoginToken(userId, 1, result);
        
            if (!insertTokenResult.success) {
                console.error('Error inserting login token:', insertTokenResult.error);
            }

            await userService.updateLoggedInFlag({isLoggedIn : 1, userId });
            return [false, { email : email, token : result }]
        }

        return [true,  "Invalid credentials"]
    } catch(e) {
        console.log("errior", e.stack)
        return [true,  "Something went wrong"];
    }
}

module.exports = {
    signup : signup,
    userLogin : userLogin
}