const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  id: String | Number,
  date: String,
  name: String,
  description: String,
  timeStart: String,
  timeEnd: String,
  owner: String
});

module.exports = model("Task", taskSchema);
