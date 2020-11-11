const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        employeeCode: String!
        employee: [Employee]
        lastName: String!
        firstName: String!
        lastKanaName: String
        firstKanaName: String
        gender: Int!
        birthDay: String
        section: [Section]
        hireDate: String
        updateDatetime: String!
    }

    type Employee {
        id: ID!
        token: String!
        userId: String!
        password: String!
        confirmPassword: String!
        createdAt: String!
    }

    type Section {
        id: ID!
        sectionCode: String!
        sectionName: String
        createdAt: String!
    }

    input RegisterInput {
        userId: String!
        password: String!
        confirmPassword: String!
    }

    input CreateUserInput {
        employeeCode: String!
        lastName: String!
        firstName: String!
        lastKanaName: String
        firstKanaName: String
        gender: Int!
        birthDay: String
        hireDate: String
        updateDatetime: String!
    }


    type Query {
        getUsers: [User]!
        getUser(userId: ID!): User
        getEmployees: [Employee]!
        getEmployee(employeeId: ID!): Employee
    }

    type Mutation {
        register(registerInput: RegisterInput): Employee!
        login(userId: String!, password: String!, confirmPassword: String!): Employee!
        createUser(createUserInput: CreateUserInput): User!
    }
`