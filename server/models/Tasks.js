const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    date: Date,
    description: String
});

module.exports = mongoose.model('Task', TaskSchema);