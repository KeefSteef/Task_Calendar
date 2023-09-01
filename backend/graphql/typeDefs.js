const { gql } = require("apollo-server");

module.exports = gql`
  type Task {
    id: ID!
    date: String
    name: String
    timeStart: String
    timeEnd: String
    description: String
    owner: String
  }

  type User {
    email: String
    username: String
    password: String
    token: String
  }

  type CompletedTask {
    id: ID!
    date: String
    name: String
    timeStart: String
    timeEnd: String
    owner: String
    completedDate: String
  }

  type CompletedTaskInput {
    date: String
    name: String
    timeStart: String
    timeEnd: String
    owner: String
    completedDate: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input TaskInput {
    date: String
    name: String
    timeStart: String
    description: String
    timeEnd: String
    owner: String
  }

  type Query {
    task(ID: ID!): Task!
    tasks(dates: [String!], owner: String!): [Task]!
    completedTasks(owner: String!): [CompletedTask]!
  }

  type Mutation {
    createTask(taskInput: TaskInput): Task!
    editTask(ID: ID!, taskInput: TaskInput): Boolean
    removeTask(ID: ID!): Boolean
    doCompleteTask(ID: ID!): Task!
    backCompletedTask(ID: ID!, taskInput: TaskInput): Task!
    createUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
  }
`;
