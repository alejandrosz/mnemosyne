require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const bcryptSalt = 10;
const Piece = require("../models/Piece");
const collectionsId = Array(10)
  .fill()
  .map(() => {
    return new mongoose.mongo.ObjectId();
  });
// const itemsId = Array(10)
//   .fill()
//   .map(() => {
//     return new mongoose.mongo.ObjectId();
//   });

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "Pedro",
    password: bcrypt.hashSync("Pedro", bcrypt.genSaltSync(bcryptSalt)),
    collections: [
      `${collectionsId[0]}`,
      `${collectionsId[1]}`,
      `${collectionsId[2]}`
    ]
  },
  {
    username: "Alejandro",
    password: bcrypt.hashSync("Alejandro", bcrypt.genSaltSync(bcryptSalt)),
    collections: [
      `${collectionsId[3]}`,
      `${collectionsId[4]}`,
      `${collectionsId[5]}`
    ]
  }
];

Piece.find({ name: new RegExp("forest", "gi") })
  .limit(50)
  .then(pieces => {
    piecesId = pieces.map(piece => piece._id);
    console.log(piecesId);

    let collections = [
      {
        _id: collectionsId[0],
        name: "Colección1",
        pieces: [
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`
        ]
      },
      {
        _id: collectionsId[1],
        name: "Colección2",
        pieces: [
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`
        ]
      },
      {
        _id: collectionsId[2],
        name: "Colección3",
        pieces: [
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`
        ]
      },
      {
        _id: collectionsId[3],
        name: "Colección4",
        pieces: [
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
        ]
      },
      {
        _id: collectionsId[4],
        name: "Colección5",
        pieces: [
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`
        ]
      },
      {
        _id: collectionsId[5],
        name: "Colección6",
        pieces: [
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`,
          `${piecesId[Math.floor(Math.random() * 30)]}`
        ]
      }
    ];
    User.deleteMany()
      .then(() => {
        return User.create(users);
      })
      .then(usersCreated => {
        console.log(
          `${usersCreated.length} users created with the following id:`
        );
        console.log(usersCreated.map(u => u._id));
      });

    Collection.deleteMany()
      .then(() => {
        return Collection.create(collections);
      })
      .then(collectionsCreated => {
        console.log(
          `${collectionsCreated.length} collections created with the following id:`
        );
        console.log(collectionsCreated.map(u => u._id));
      })

      .then(() => {
        mongoose.disconnect();
      })
      .catch(err => {
        mongoose.disconnect();
        throw err;
      });
  });

// Item.deleteMany()
//   .then(() => {
//     return Item.create(items);
//   })
//   .then(itemsCreated => {
//     console.log(`${itemsCreated.length} items created with the following id:`);
//     console.log(itemsCreated.map(u => u._id));
//   })
