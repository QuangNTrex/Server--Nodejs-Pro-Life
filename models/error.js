const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
  error: {},
});

module.exports = mongoose.model("Error", ErrorSchema);
