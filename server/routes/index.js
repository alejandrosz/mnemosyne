const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Items = require("../models/Item");
const Collections = require("../models/Collection");

router.get("/profile/:id", (req, res, next) => {
  Users.findById(req.params.id)
    .populate([
      {
        path: "collections",
        model: "Collection",
        poulate: { path: "items", model: "Item" }
      }
    ])
    .then(userFound => res.json(userFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.get("/collection/:id", (req, res, next) => {
  Collections.findById(req.params.id)
    .populate("items")
    .then(collectionFound => res.json(collectionFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.get("/item/:id", (req, res, next) => {
  Items.findById(req.params.id)
    .then(itemFound => res.json(itemFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

router.post("/collection/:id", (req, res, next) => {
  let newCollection = {
    name: req.body.name
  };
  Users.findByIdAndUpdate(req.params.id, newCollection);
});

router.post("/item/:id", (req, res, next) => {
  let newItem = {
    name: req.body.name,
    image: req.body.url,
    api: req.body.api
    //id??
  };
  Collections.findByIdAndUpdate(req.params.id, newItem);
});

router.delete("/collection/:id", (req, res, next) => {
  Collections.findByIdAndDelete(req.params.id);
});

router.delete("/item/:id", (req, res, next) => {
  Items.findByIdAndDelete(req.params.id);
});

module.exports = router;
