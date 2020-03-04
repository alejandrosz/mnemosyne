require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const bcryptSalt = 10;
const collectionsId = Array(10)
  .fill()
  .map(() => {
    return new mongoose.mongo.ObjectId();
  });
const itemsId = Array(10)
  .fill()
  .map(() => {
    return new mongoose.mongo.ObjectId();
  });

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
    collections: [`${collectionsId[0]}`, `${collectionsId[1]}`]
  },
  {
    username: "Alejandro",
    password: bcrypt.hashSync("Alejandro", bcrypt.genSaltSync(bcryptSalt)),
    collections: [`${collectionsId[2]}`, `${collectionsId[3]}`]
  }
];

let collections = [
  {
    _id: collectionsId[0],
    name: "Colección1",
    items: [`${itemsId[0]}`, `${itemsId[2]}`]
  },
  {
    _id: collectionsId[1],
    name: "Colección2",
    items: [`${itemsId[1]}`, `${itemsId[3]}`]
  },
  {
    _id: collectionsId[2],
    name: "Colección3",
    items: [`${itemsId[3]}`, `${itemsId[0]}`]
  },
  {
    _id: collectionsId[3],
    name: "Colección4",
    items: [`${itemsId[2]}`, `${itemsId[1]}`]
  }
];

let items = [
  {
    _id: itemsId[0],
    name: "Tschumi",
    image:
      "https://www.moma.org/media/W1siZiIsIjM1MyJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=59db154a73fdb9c9",
    api: "MET"
  },
  {
    _id: itemsId[1],
    name: "Hejduk",
    image:
      "https://www.bmiaa.com/wp-content/uploads/2016/04/John-Hejduk-Victims-from-masque-series-1986.jpg",
    api: "MOMA"
  },
  {
    _id: itemsId[2],
    name: "Miralles",
    image:
      "https://i1.wp.com/www.barcelonarchitecturewalks.com/web2018/wp-content/uploads/2018/02/drawings-miralles-1.png",
    api: "NASA"
  },
  {
    _id: itemsId[3],
    name: "Price",
    image: "https://miro.medium.com/max/2000/1*Hx75CuFpw8md2hoc1etIBg.png",
    api: "RIJKS"
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
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
  });

Item.deleteMany()
  .then(() => {
    return Item.create(items);
  })
  .then(itemsCreated => {
    console.log(`${itemsCreated.length} items created with the following id:`);
    console.log(itemsCreated.map(u => u._id));
  })

  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
