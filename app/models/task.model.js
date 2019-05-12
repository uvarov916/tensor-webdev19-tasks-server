const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    description: String,
    username: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);