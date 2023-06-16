const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  title: { type: String, default: ""},
  pay: { type: Boolean, required: true, default: false },
  totalPrice: { type: Number, required: true, default: 0 },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  list: [
    {
      price: { type: Number, required: true, default: 0 },
      quantity: { type: Number, required: true, default: 0 },
      title: { type: String, default: ""},
      createdAt: { type: Date, default: Date.now(), required: true },
      updatedAt: { type: Date, default: Date.now(), required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now(), required: true },
  updatedAt: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Bill", BillSchema);
