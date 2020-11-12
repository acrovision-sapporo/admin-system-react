const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');
const Employee = require('../../models/Employee');

function generateToken(employee) {
    return jwt.sign(
        {
            id: employee.id,
            userId: employee.userId,
        }, 
        SECRET_KEY, 
        { expiresIn: '24h'});
}

module.exports = {
    Query: {
        async getEmployees() {
            try {
                const employees = await Employee.find();
                return employees;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async register(
            _, 
            { 
                registerInput: { userId, password, confirmPassword }
            },
            context, 
            info
            ) {
            // validate user data
            const { valid, errors } = validateRegisterInput( userId, password, confirmPassword );
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // TODO make sure user doesnt already exists
            const employee = await Employee.findOne({ userId });
            if(employee) {
                throw new UserInputError('すでに存在しているユーザーです!', {
                    errors: {
                        username: 'すでに存在しているユーザーです！'
                    }
                })
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newEmployee = new Employee({
                userId,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newEmployee.save();

            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(_, { userId, password, confirmPassword }) {
            const { errors, valid } = validateLoginInput(userId, password, confirmPassword);

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const employee = await Employee.findOne({ userId });

            if ( !employee ) {
                errors.general = 'ユーザーが見つかりません！';
                throw new UserInputError('ユーザーが見つかりません', { errors });
            }

            const match = await bcrypt.compare(password, employee.password);
            if ( !match ) {
                errors.general = '登録情報と一致しません！';
                throw new UserInputError('登録情報と一致しません！', { errors })
            }

            const token = generateToken(employee)
            return {
                ...employee._doc,
                id: employee._id,
                token
            }
        }
    }
}