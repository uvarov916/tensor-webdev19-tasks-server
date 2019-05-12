
module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/register', user.register);
    app.post('/login', user.login);
    app.post('/logout', user.logout);
    app.get('/username', user.authWrapper(user.getUsername));
}