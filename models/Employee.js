const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
    userId: String,
    password: String,
    createdAt: String
})

module.exports = model('Employee', employeeSchema);