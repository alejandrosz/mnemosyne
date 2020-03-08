require("dotenv").config();
var axios = require("axios");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const Piece = require("../models/Piece");
const dataMOMA = require("../dataMOMA.json");
// const idsMET = require("../objectsIdMET.json")
const idsMET = require("../notUploadedMET.json")

// import { format } from 'url';
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
const uriBaseMET =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/"; // + [objectID]
const uriBaseRMA = "https://www.rijksmuseum.nl/api/en/collection/";
const csvFilePath =
  "/Users/laura/Documents/Ironhack/w8d1/mnemosyne/server/dataRMA.csv";


  
const getPieceMET = id => {
  return axios
    .get(uriBaseMET + id)
    .then(result => {
      console.log("resultdata met", result.data)

      if (result && result.data && result.data.primaryImageSmall !== "") {
        const {
          tags,
          title,
          primaryImageSmall,
          medium,
          department,
          classification,
          country,
          objectBeginDate,
          culture,
          dinasty,
          period,
          reign,
          region,
          city,
          artistDisplayName
        } = result.data;
        const origin = [];
        if (region && region !== "") {
          origin.push(region);
        }
        if (city && city !== "") {
          origin.push(city);
        }
        if (country && country !== "") {
          origin.push(country);
        }
        const p = [];
        if (period && period !== "") {
          p.push(period);
        }
        if (dinasty && dinasty !== "") {
          p.push(dinasty);
        }
        if (reign && reign !== "") {
          p.push(reign);
        }
        const ts = tags ? tags.map(t => t.term) : [];
        const obj = {
          museum: "MET",
          museumId: id,
          name: title,
          imageUrl: primaryImageSmall,
          description: "",
          author: artistDisplayName,
          year: objectBeginDate,
          period: p,
          culture: culture,
          origin: origin,
          technic: [medium],
          classification: classification,
          department: department,
          tags: ts,
          rating: Math.floor(Math.random() * 300) + 100
        };
        Piece.update({ museumId: id, museum: "MET" }, obj, {
          upsert: true
        }).catch(err => {
          // mongoose.disconnect();
          // throw err;
          console.log(err);
        });
      }
    })
    .catch(err => {
      // mongoose.disconnect();
      // throw err;
      console.log(err);
    });
};



const getPieceRMA = id => {
  return axios
    .get(uriBaseRMA + id + "?key=LfznSiay")
    .then(result => {
      console.log("piece rma", result.data);

      if (
        result &&
        result.data &&
        result.data.artObject.webImage &&
        result.data.artObject.webImage.url
      ) {
        const {
          webImage,
          title,
          plaqueDescriptionEnglish,
          objectTypes,
          principalMaker,
          materials,
          techniques,
          dating,
          description,
          classification,
          productionPlaces,
          objectCollection,
          makers
        } = result.data.artObject;
        const obj = {
          museum: "RMA",
          museumId: id,
          name: title,
          imageUrl: webImage.url,
          description: plaqueDescriptionEnglish || description,
          author: principalMaker,
          year: dating && dating.sortingDate,
          period: [dating.period],
          culture: makers[0] ? makers[0].nationality : "",
          origin: [...classification.places, ...productionPlaces],
          technic: [...materials, ...techniques],
          classification: objectTypes[0],
          department: objectCollection && objectCollection[0],
          tags: [...classification.iconClassDescription],
          rating: Math.floor(Math.random() * 300) + 100
        };
        Piece.create(
          obj

          // Piece.update({ museumId: id, museum: "RMA" }, obj, {
          //   upsert: true
        ).catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const getPieceMOMA = index => {
  const piece = dataMOMA[index];
  console.log(piece);
  if (
    piece &&
    piece.ThumbnailURL !== "" &&
    piece.ThumbnailURL !== null &&
    piece.Date !== null &&
    piece.Date.length >= 4 &&
    piece.Date.match(/\d{4}/) &&
    piece.Date.match(/\d{4}/)[0] &&
    piece.Nationality
  ) {
    const year = parseInt(piece.Date.match(/\d{4}/)[0]);
    const {
      ObjectID,
      Artist,
      Title,
      ThumbnailURL,
      Department,
      Medium,
      Classification,
      Nationality
    } = piece;
    const obj = {
      museum: "MOMA",
      museumId: ObjectID,
      name: Title,
      imageUrl: ThumbnailURL,
      description: "",
      author: Artist[0],
      year: year,
      period: [],
      culture: Nationality[0],
      origin: Nationality,
      technic: Medium,
      classification: Classification,
      department: Department,
      tags: [],
      rating: Math.floor(Math.random() * 300) + 100
    };
    // Piece.update({ museumId: ObjectID, museum: "MOMA" }, obj, {
    //   upsert: true
    Piece.create(obj)
      .then(piece => console.log("piezaMoma", piece))
      .catch(err => {
        console.log(err);
        mongoose.disconnect();
        throw err;
      });
  }
};

const metIds = (startFrom, to) => {
  var i = 0;
  var maxTimes = to - startFrom;
  function increaseTime() {
    const id = idsMET[startFrom + i]
    getPieceMET(id);
    i++;
    if (i === maxTimes) {
      clearInterval(intervalID);
    }
  }
  var intervalID = setInterval(increaseTime, 200);
};

const rmaIds = (startFrom, to) => {
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      var i = 0;
      var maxTimes = to - startFrom;
      function increaseTime() {
        const id = jsonObj[startFrom + i].objectInventoryNumber;
        getPieceRMA(id);
        i++;
        if (i === maxTimes) {
          clearInterval(intervalID);
        }
      }
      var intervalID = setInterval(increaseTime, 500);
    });
};

const momaIds = (startFrom, to) => {
  for (let i = startFrom; i <= to; i++) {
    getPieceMOMA(i);
  }
};
const start = 50000;
const finish = 120000;
metIds(start + 1, finish);
// rmaIds(start, finish);
// momaIds(start, finish);
