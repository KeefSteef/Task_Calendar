const { Schema, model } = require("mongoose");

const completedTaskSchema = new Schema({
  id: String | Number,
  date: String,
  completedDate: String,
  name: String,
  timeStart: String,
  timeEnd: String,
  owner: String
});

module.exports = model("CompletedTask", completedTaskSchema);
