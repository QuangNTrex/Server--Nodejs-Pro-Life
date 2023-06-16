const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  title: { type: String, default: "" },
  startAt: { type: Date },
  endAt: { type: Date },
  done: { type: Boolean, required: true, default: false },
  note: { type: String },
  list: [
    {
      title: { type: String, default: "" },
      startAt: { type: Date },
      endAt: { type: Date },
      done: { type: Boolean, required: true, default: false },
      note: { type: String },
      createdAt: { type: Date, default: Date.now(), required: true },
      updatedAt: { type: Date, default: Date.now(), required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now(), required: true },
  updatedAt: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Plan", PlanSchema);
