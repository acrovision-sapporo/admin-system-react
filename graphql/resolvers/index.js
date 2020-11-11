const usersResolvers = require('./users');
const employeesResolvers = require('./employees');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...employeesResolvers.Query
    },
    Mutation: {
        ...employeesResolvers.Mutation
    }
}