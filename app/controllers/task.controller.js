const Task = require('../models/task.model.js');

exports.create = (req, res) => {

    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Description cannot be empty."
        });
    }

    // Create a Task
    const task = new Task({
        description: req.body.description,
        username: req.username
    });

    // Save Task in the database
    task.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task."
            });
        });
};

exports.findAll = (req, res) => {
    Task.find({ 'username': req.username })
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks."
            });
        });
};

exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            return res.status(500).send({
                message: "Error retrieving task with id " + req.params.taskId
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    // Find task and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        description: req.body.description
    })
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            return res.status(500).send({
                message: "Error updating task with id " + req.params.taskId
            });
        });
};

exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send({ message: "Task deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            return res.status(500).send({
                message: "Could not delete task with id " + req.params.taskId
            });
        });
};

exports.deleteAll = (req, res) => {
    Task.remove({})
        .then(task => {
            res.send({ message: "Tasks deleted successfullly." });
        }).catch(err => {
            return res.status(500).send({
                message: "Couldn't delete tasks."
            });
        });
};
