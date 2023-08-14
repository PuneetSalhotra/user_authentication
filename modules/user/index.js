
// define APIs
const userRoutes = require('./routes/userRoutes');
const userValidator = require('./validators/userValidator');

app.post('/user/login', userValidator.userLogin, userRoutes.userLogin);
app.post('/user/signup', userValidator.signup, userRoutes.signup);

