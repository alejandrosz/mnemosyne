const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("../models/Item");

const collectionSchema = new Schema({
  name: String,
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }]
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
