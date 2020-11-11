const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    employeeCode: String,
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'employees'
    },
    lastName: String,
    firstName: String,
    lastKanaName: String,
    firstKanaName: String,
    gender: Number,
    birthDay: String,
    section: {
        type: Schema.Types.ObjectId,
        ref: 'sections'
    },
    hireDate: String,
    updateDatetime: String
})

module.exports = model('User', userSchema);