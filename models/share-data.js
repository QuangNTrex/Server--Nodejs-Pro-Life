const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareDataSchema = new Schema(
  {
    type: { type: String, required: true },
  },
  { strict: false }
);

module.exports = mongoose.model("ShareData", ShareDataSchema)