const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, default: "" },
  deadline: { type: Date },
  done: { type: Boolean, required: true, default: false },
  repeat: {},
  list: [
    {
      totalPrice: { type: Number, required: true, default: 0 },
      title: { type: String, default: "" },
      createdAt: { type: Date, default: Date.now(), required: true },
      updatedAt: { type: Date, default: Date.now(), required: true },
    },
  ],

  createdAt: { type: Date, default: Date.now(), required: true },
  updatedAt: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
