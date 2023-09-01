const resolverTask = require("./task");
const resolverUser = require("./user");

module.exports = {
  Query: {
    ...resolverTask.Query,
  },

  Mutation: {
    ...resolverUser.Mutation,
    ...resolverTask.Mutation,
  },
};
