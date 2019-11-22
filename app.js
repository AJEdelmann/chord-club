const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mongoose = require("mongoose");

// ROUTERS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const musicsRouter = require("./routes/musics");
// sudo killall -9 node
// DEBUG=[app.js]:* npm start
// OUR MIDDLEWARE
const { setCors } = require("./middleware/security");

// INIT THE SERVER
const app = express();

// LOGS
app.use(logger("dev"));

// CONNECT TO MONGO
mongoose.connect("mongodb://localhost:27017/music-chords-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.on("open", () => {
  console.log(`Connected to the database...`);
});

// SETUP LOWDB
const adapter = new FileSync("data/db.json");
const db = low(adapter);
db.defaults({
  musics: [],
  users: [],
  instruments: []
}).write();

// REQUEST PARSERS
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/musics", musicsRouter);

// ERROR HANDLING
app.use(function(req, res, next) {
  const err = new Error("Something is wrong!");

  next(err);
});

app.use(function(err, req, res, next) {
  res.status(400).send({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
