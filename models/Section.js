const { model, Schema } = require('mongoose');

const sectionSchema = new Schema({
    sectionCode: String,
    sectionName: String,
    createdAt: String
})


module.exports = model('Section', sectionSchema);