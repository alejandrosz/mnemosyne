const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }]
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
