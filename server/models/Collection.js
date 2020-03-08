const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Piece = require("../models/Piece");

const collectionSchema = new Schema({
  name: String,
  pieces: [{ type: Schema.Types.ObjectId, ref: "Piece" }]
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
