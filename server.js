require("dotenv").config();
const express = require("express");
const app = express();

const todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn Express", completed: false },
  { id: 3, title: "Build a REST API", completed: false },
];

// console.log(express.json);
// console.log(express.json());

app.use(express.json());
// Middleware to parse JSON bodies

app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: true }));
// Middleware to parse URL-encoded bodies

app.post("/todos", (req, res) => {
  // console.log(req.params);
  // console.log(req.query);
  console.log(req.body);
  todos.push(req.body);
  res.json({
    message: "Todo created successfully",
  });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server on port", port));
