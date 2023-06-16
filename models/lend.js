const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LendSchema = new Schema({
  fullName: { type: String, required: true },
  title: { type: String, default: "" },
  pay: { type: Boolean, required: true, default: false },
  totalPrice: { type: Number, required: true, default: 0 },
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
  estimateDate: { type: Date },
});

module.exports = mongoose.model("Lend", LendSchema);
