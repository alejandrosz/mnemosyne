const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Collections = require("../models/Collection");
const Pieces = require("../models/Piece");
const mongoose = require("mongoose");
// const limit = 30;

router.get("/pieces/:filter", (req, res, next) => {
  console.log("hola", req.params);
  let filter = req.params.filter;
  Pieces.find({
    $and: [
      {
        $or: [
          { name: new RegExp(filter, "gi") },
          { museum: new RegExp(filter, "gi") },
          { description: new RegExp(filter, "gi") },
          { author: new RegExp(filter, "gi") },
          // { year: new RegExp(filter, "gi") },
          { period: new RegExp(filter, "gi") },
          { culture: new RegExp(filter, "gi") },
          { origin: new RegExp(filter, "gi") },
          { technic: new RegExp(filter, "gi") },
          { classification: new RegExp(filter, "gi") },
          { department: new RegExp(filter, "gi") },
          { tags: new RegExp(filter, "gi") }
        ]
      },
      // { origin: { $size: { $gt: 0 } } }
      { "origin.0": { $exists: true } }
    ]
  })
    .sort({ rating: -1 })
    .limit(40)
    .then(piecesFound => res.json(piecesFound))
    .catch(err => {
      console.error("Error on search", err.message);
      console.error(err);
      next(err);
    });
});

router.post("/find",
  (req, res, next) => {
    let { yearRange, searchText, filters } = req.body;
   let  regExpFilter = filters.map(filter => new RegExp(filter, "gi"))
    Pieces.find({
      $and: [
        {
          $or: [
            { name: new RegExp(searchText, "gi") },
            { museum: new RegExp(searchText, "gi") },
            { description: new RegExp(searchText, "gi") },
            { author: new RegExp(searchText, "gi") },
            { period: new RegExp(searchText, "gi") },
            { culture: new RegExp(searchText, "gi") },
            { origin: new RegExp(searchText, "gi") },
            { technic: new RegExp(searchText, "gi") },
            { classification: new RegExp(searchText, "gi") },
            { department: new RegExp(searchText, "gi") },
            { tags: new RegExp(searchText, "gi") }
          ]
        },
        { year: { $gte: yearRange[0], $lte: yearRange[1] } },
        {
          $or: [
            { name: { $in: [...regExpFilter] } },
            { description: { $in: [...regExpFilter] } },
            { culture: { $in: [...regExpFilter] } },
            { technic: { $in: [...regExpFilter] } },
            { classification: { $in: [...regExpFilter] } },
            { department: { $in: [...regExpFilter] } },
            { tags: { $in: [...regExpFilter] } },
          ]
        }
      ]
    })
      .sort({ rating: -1 })
      .limit(40)
      .then(piecesFound => { 
        return res.json(piecesFound)})
    .catch(err => {
      console.error("Error on search", err.message);
      console.error(err);
      next(err);
    });
  });

router.get("/profile/:id", (req, res, next) => {
  Users.findById(req.params.id)
    .populate([
      {
        path: "collections",
        model: "Collection",
        populate: { path: "pieces", model: "Piece" }
      }
    ])
    .then(userFound => res.json(userFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.get("/piecesrandom", (req, res, next) => {
  let randomResult = [];
  Pieces.aggregate([{ $match: { museum: "MOMA" } }, { $sample: { size: 15 } }])
    .then(piecesFound => {
      randomResult.push(...piecesFound);
      Pieces.aggregate([
        { $match: { museum: "MET" } },
        { $sample: { size: 20 } }
      ]).then(piecesFound => {
        randomResult.push(...piecesFound);
        Pieces.aggregate([
          { $match: { museum: "RMA" } },
          { $sample: { size: 15 } }
        ]).then(piecesFound => {
          randomResult.push(...piecesFound);
          return res.json(randomResult);
        });
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.get("/collection/:id", (req, res, next) => {
  Collections.findById(req.params.id)
    .populate("pieces")
    .then(collectionFound => res.json(collectionFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.get("/piece/:id", (req, res, next) => {
  Pieces.findById(req.params.id)
    .then(pieceFound => res.json(pieceFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.put("/collection/add/:collectionId&:pieceId", (req, res, next) => {
  const collectionId = req.params.collectionId;
  const pieceId = req.params.pieceId;

  Collections.findById(collectionId)
    .then(collection => {
      updatedPieces = [...collection.pieces];
      updatedPieces.push(mongoose.Types.ObjectId(pieceId));
      console.log(updatedPieces);
    })
    .then(() => {
      Collections.findByIdAndUpdate(
        { _id: collectionId },
        { $set: { pieces: updatedPieces } },
        { new: true, returnNewDocument: true }
      ).then(updatedCollection => res.json(updatedCollection));
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.put("/collection/del/:collectionId&:pieceId", (req, res, next) => {
  const collectionId = req.params.collectionId;
  const pieceId = req.params.pieceId;

  Collections.findById(collectionId)
    .then(collection => {
      let updatedPieces = collection.pieces.filter(
        p => p._id.toString() !== pieceId
      );
      Collections.findByIdAndUpdate(
        { _id: collectionId },
        { $set: { pieces: updatedPieces } },
        { new: true, returnNewDocument: true }
      ).then(updatedCollection => res.json(updatedCollection));
    })
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.put("/piece/like/:id", (req, res, next) => {
  let pieceId = req.params.id;
  Pieces.findByIdAndUpdate(
    { _id: pieceId },
    { $inc: { rating: 1 } },
    { new: true, returnNewDocument: true }
  )
    .then(updatedPiece => res.json(updatedPiece))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.post("/collection/:id", (req, res, next) => {
  let newCollection = {
    name: req.body.name
  };
  Collections.create(newCollection).then(createdCollection => {
    Users.findById(req.params.id).then(user => {
      updatedCollections = [...user.collections];
      updatedCollections.push(mongoose.Types.ObjectId(createdCollection.id));
      console.log("updatedCollections", updatedCollections);
      Users.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { collections: updatedCollections } },
        { new: true, returnNewdocument: true }
      ).then(updatedUser => res.json(updatedUser));
    });
  });
});

router.delete("/collection/:id", (req, res, next) => {
  Collections.findByIdAndDelete(req.params.id).then(() => {
    Users.findOne({ collections: req.params.id }).then(user => {
      let updatedCollections = user.collections.filter(
        c => c.toString() !== req.params.id 
      );
      Users.findByIdAndUpdate(
        { _id: user._id },
        { $set: { collections: updatedCollections } },
        { new: true, returnNewDocument: true }
      ).then(updatedUser => res.json(updatedUser));
    });
  });
});

module.exports = router;
