
const adminRoutes = require('./routes/adminRoutes');
const adminValidator = require('./validators/adminValidator');

app.get('/admin/users', /* middleware for authentication */ adminRoutes.getLoggedInUsers); // open API to get User details. It is as per business case. Authorization can be there. This is just to give a structure details. 
app.post('/admin/revoke_user_login', adminValidator.revokeUserLogin, /* middleware for authentication */ adminRoutes.revokeUserLogin);

