const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const logger = require("morgan");
const connectDB = require("./config/database");

require("dotenv").config({ path: "./config/.env" });
require("./config/passport")(passport);
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

connectDB();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "secret",
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
