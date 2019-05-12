const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    const tasks = require('../controllers/task.controller.js');

    app.post('/tasks', user.authWrapper(tasks.create));
    app.get('/tasks', user.authWrapper(tasks.findAll));
    app.get('/tasks/:taskId', user.authWrapper(tasks.findOne));
    app.post('/tasks/:taskId', user.authWrapper(tasks.update));
    app.delete('/tasks/:taskId', user.authWrapper(tasks.delete));
    app.delete('/tasks', user.authWrapper(tasks.deleteAll));
}