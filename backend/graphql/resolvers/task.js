const Task = require("../../models/Task");
const { v4: uuidv4 } = require("uuid");
const { ApolloError } = require("apollo-server");
const { ObjectId } = require("mongodb");
const CompletedTask = require("../../models/CompletedTask");

module.exports = {
  Query: {
    async task(_, { ID }) {
      return await Task.findById(ID);
    },

    async tasks(_, { dates, owner }) {
      return await Task.find().then((tasks) =>
        tasks.filter((task) =>
          dates.some((date) => task.date === date && task.owner === owner)
        )
      );
    },

    async completedTasks(_, { owner }) {
      return await CompletedTask.find().then((tasks) =>
        tasks.filter((task) => task.owner === owner)
      );
    },
  },

  Mutation: {
    async createTask(
      _,
      { taskInput: { date, name, timeStart, timeEnd, owner } }
    ) {
      const oldTask = await Task.findOne({
        date,
        name,
        timeStart,
        timeEnd,
        owner,
      });

      if (oldTask) {
        throw new ApolloError("This task already created!");
      }

      const newTask = new Task({
        date,
        name,
        timeStart,
        timeEnd,
        owner,
      });

      newTask.id = uuidv4();

      const res = await newTask.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },

    async doCompleteTask(_, { ID }) {
      const { date, name, timeStart, timeEnd, owner, id } = await Task.findOne({
        id: ID,
      });

      const newCompletedTask = new CompletedTask({
        id,
        date,
        name,
        timeStart,
        timeEnd,
        owner,
        completedDate: new Date(),
      });

      const deleteTask = (await Task.deleteOne({ id: ID })).deletedCount;
      return newCompletedTask.save();
    },

    async removeTask(_, { ID }) {
      const wasDeleted = (await Task.deleteOne({ id: ID })).deletedCount;
      return wasDeleted;
    },

    async backCompletedTask(
      _,
      { ID, taskInput: { date, name, timeStart, timeEnd, owner } }
    ) {
      const oldTask = await Task.findOne({
        date,
        name,
        timeStart,
        timeEnd,
        owner,
      });

      if (oldTask) {
        throw new ApolloError("This task already created!");
      }

      const newTask = new Task({
        date,
        name,
        timeStart,
        timeEnd,
        owner,
      });

      newTask.id = ID;

      const wasDeleted = (await CompletedTask.deleteOne({ id: ID }))
        .deletedCount;

      const res = await newTask.save();
      return {
        id: res._id,
        ...res._doc,
      };
    },

    async editTask(
      _,
      { ID, taskInput: { date, name, category, timeStart, timeEnd } }
    ) {
      const wasEdited = (
        await Task.updateOne(
          { id: ID },
          { date, name, category, timeStart, timeEnd }
        )
      ).modifiedCount;

      return wasEdited;
    },
  },
};
