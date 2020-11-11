const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch(err) {
                throw new Error(err);
            }
        },
    }
}