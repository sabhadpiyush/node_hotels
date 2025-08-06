const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyparser = require("body-parser");
app.use(bodyparser.json());

const port = process.env.port || 3000;

const Menuitem = require("./models/menuitems");
const menuitem = require("./models/menuitems");

app.get("/", function (req, res) {
  res.send("hello world");
});

const menurouter = require("./routes/menuroutes");
app.use("/menu", menurouter);

const personroutes = require("./routes/personroutes");
app.use("/person", personroutes);

app.listen(3000, () => {
  console.log("server is started");
});
