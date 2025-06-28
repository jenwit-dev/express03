require("dotenv").config();
const express = require("express");
const app = express();

const middleWare1 = (req, res, next) => {
  console.log("middleware 1");
  // res.json({msg: "middleware 1 run"})
  next();
};

const middleWare2 = (req, res, next) => {
  console.log("middleware 2");
  res.json({ msg: "middleware 2 run" });
  // next();
};

app.get("/", middleWare1, middleWare2);

// app.get("/", middleWare2);

app.get("/", (req, res, next) => {
  console.log("middleware 3");
  // res.json({ msg: "middleware 3 run" });
  next();
});

app.use((req, res, next) => {
  console.log("middleware 0");
  res.json({ msg: "middleware 0 run" });
  // next();
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server on port", port));
