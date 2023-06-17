const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  title: { type: String, default: "" },
  pay: { type: Boolean, default: false },
  totalPrice: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  list: [
    {
      price: { type: Number, default: 0 },
      quantity: { type: Number, default: 0 },
      title: { type: String, default: "" },
      createdAt: { type: Date, default: Date.now() },
      updatedAt: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Bill", BillSchema);
