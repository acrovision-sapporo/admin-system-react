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
        async getUser(_, { userId} ) {
            try {
                const user = await User.findById(userId);
                if (user) {
                    return user;
                } else {
                    throw new Error('ユーザーが見つかりません！')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}