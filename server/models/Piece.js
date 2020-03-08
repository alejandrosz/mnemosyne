const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pieceSchema = new Schema({
  museum: String,///
  museumId: String,//
  name: String,//
  imageUrl: String,//
  description: String,//
  author: String,//
  year: Number,//
  period: Array,//
  culture: String,
  origin: Array,//
  technic: Array,
  classification: String,//
  department: String,
  tags: Array,
  rating: Number//
});

const Piece = mongoose.model("Piece", pieceSchema);
module.exports = Piece;
