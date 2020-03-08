const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Items = require("../models/Item");
const Collections = require("../models/Collection");
const Pieces = require("../models/Piece");
const mongoose = require("mongoose");

router.get("/pieces/:filter", (req, res, next) => {
  let filter = req.params.filter;
  Pieces.find({
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
  })
    .then(piecesFound => res.json(piecesFound))
    .catch(err => {
      console.error("Error connecting to mongo");
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

// router.get("/collection/:id", (req, res, next) => {
//   Collections.findById(req.params.id)
//     .populate("items")
//     .then(collectionFound => res.json(collectionFound))
//     .catch(err => {
//       console.error("Error connecting to mongo");
//       next(err);
//     });
// });

// router.get("/item/:id", (req, res, next) => {
//   Items.findById(req.params.id)
//     .then(itemFound => res.json(itemFound))
//     .catch(err => {
//       console.error("Error connecting to mongo");
//       next(err);
//     });
// });

router.post("/collection/:id", (req, res, next) => {
  let newCollection = {
    name: req.body.name
  };
  Collections.create(newCollection).then(createdCollection => {
    Users.findById(req.params.id).then(user => {
      updatedCollections = [...user.collections];
      updatedCollections.push(mongoose.Types.ObjectId(createdCollection.id));
      console.log("updatedCollections", updatedCollections);
    });
    Users.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { collections: updatedCollections } },
      { new: true, returnNewdocument: true }
    ).then(updatedUser => res.json(updatedUser));
  });
});

// router.post("/item/:id", (req, res, next) => {
//   let newItem = {
//     name: req.body.name,
//     image: req.body.url,
//     api: req.body.api
//     //id??
//   };
//   Collections.findByIdAndUpdate(req.params.id, newItem);
// });

router.delete("/collection/:id", (req, res, next) => {
  Collections.findByIdAndDelete(req.params.id).then(
    () => {
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
    }
    // res.json(collectionDelete)
  );
});


// router.delete("/item/:id", (req, res, next) => {
//   Items.findByIdAndDelete(req.params.id);
// });

module.exports = router;
