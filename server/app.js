require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const { DBURL } = process.env;
mongoose.Promise = Promise;
mongoose
  .connect(DBURL)
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
var corsOptions = {
  origin: function(origin, callback){
      // var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, true);
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {	
  res.setHeader('Access-Control-Allow-Origin', 'https://mn3m0s1n3.herokuapp.com/');    
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
  res.setHeader('Access-Control-Allow-Credentials', true);    
  next();
});


// Middleware Setup
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: "angular auth passport secret shh",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 2419200000
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
require("./passport")(app);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// app.use(cors());

// app.use(function (req, res, next) {	
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');    
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
//   res.setHeader('Access-Control-Allow-Credentials', true);   
//   next();
// });

const index = require("./routes/index");
app.use("/api", index);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
