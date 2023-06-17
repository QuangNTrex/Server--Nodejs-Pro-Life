const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  title: { type: String, default: "" },
  startAt: { type: Date },
  endAt: { type: Date },
  done: { type: Boolean, default: false },
  note: { type: String },
  list: [
    {
      title: { type: String, default: "" },
      startAt: { type: Date },
      endAt: { type: Date },
      done: { type: Boolean, default: false },
      note: { type: String },
      createdAt: { type: Date, default: Date.now() },
      updatedAt: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Plan", PlanSchema);
