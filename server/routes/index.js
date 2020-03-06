const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Items = require("../models/Item");
const Collections = require("../models/Collection");
const Pieces = require("../models/Piece");

router.get("/pieces/:filter", (req, res, next) => {
  let filter = req.params.filter;
  Pieces.find({
    $or: [
      { museum: { $regex: filter, $options: "i" } },
      { name: { $regex: filter, $options: "i" } },
      { description: { $regex: filter, $options: "i" } },
      { author: { $regex: filter, $options: "i" } },
      { year: { $regex: filter, $options: "i" } },
      // { period: { $regex: filter, $options: "i" } },
      // { culture: { $regex: filter, $options: "i" } },
      // { origin: { $regex: filter, $options: "i" } },
      // { technic: { $regex: filter, $options: "i" } },
      // { classification: { $regex: filter, $options: "i" } },
      // { department: { $regex: filter, $options: "i" } },
      // { tags: { $regex: filter, $options: "i" } }
    ]
  })
    .then(piecesFound => res.json(piecesFound))
    .catch(err => {
      console.error("Error connecting to mongo");
      next(err);
    });
});

// router.get('/pieces/:filter', (req, res, next) => {
//   Pieces.find()
//     .then(piecesFound => {
//       let dishFound = []
//       theDish.forEach(dish => {
//         let nameDish = dish.name;
//         if (nameDish.toLowerCase().includes(req.params.dish)) {
//           dishFound.push(dish)
//         }
//       })
//       res.json(dishFound)
//     })
//     .catch(err => console.log(err))
// })

// para buscar en compass poner esto en filter {name:/City/gi} //global includes

// router.post("/results", (req, res, next) => {
//   let filter = req.body.filter;
//   Events.find({
//     $or: [
//       { name: { $regex: filter, $options: "i" } },
//       { description: { $regex: filter, $options: "i" } },
//       { type: { $regex: filter, $options: "i" } }
//     ]
//   })
//     .then(eventsFound => {
//       let info = {
//         events: eventsFound
//       };
//       if (req.user) {
//         info.rol = req.user.rol;
//         info.id = req.user.id;
//       }
//       res.render("results", info);
//     })
//     .catch(err => {
//       console.error("Error connecting to mongo");
//       next(err);
//     });
// });

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

router.post("/collection", (req, res, next) => {
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
