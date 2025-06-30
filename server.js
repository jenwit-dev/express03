require("dotenv").config();
const express = require("express");
const app = express();

const todos = [
  { id: 11, title: "Learn HTML" },
  { id: 22, title: "Learn CSS" },
  { id: 33, title: "Learn JS" },
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

// Solution 1: Using `find` method
// app.put("/todos/:id", (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({
//       message: "Title is required",
//     });
//   }
//   const todo = todos.find((todo) => todo.id === parseInt(id, 10));
//   if (!todo) {
//     return res.status(404).json({
//       message: "Todo not found",
//     });
//   }
//   todo.title = title;
//   res.json(todos);
// });

// Solution 2: Using `findIndex` method and updating the todo object
// This method is more efficient for large arrays as it avoids creating a new array
// app.put("/todos/:id", (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({
//       message: "Title is required",
//     });
//   }
//   const idx = todos.findIndex((todo) => todo.id === parseInt(id, 10));
//   if (idx === -1) {
//     return res.status(404).json({
//       message: "Todo not found",
//     });
//   }
//   // todos[idx].title = title;
//   todos[idx] = { ...todos[idx], title };
//   // Update the title while keeping other properties
//   // This way, if there are other properties in the todo object, they will remain unchanged
//   // If you want to update the entire todo object, you can do:
//   // todos[idx] = { id: parseInt(id, 10), title };
//   // This will replace the entire todo object with a new one containing only the id and title
//   res.json(todos);
// });

// Solution 3: Using `findIndex` method and arr.splice
// This method is useful if you want to replace the entire todo object with a new one
// This is similar to the previous solution but uses `splice` to replace the entire todo object
// This is useful if you want to replace the entire todo object with a new one
// It is less efficient than the previous solution as it creates a new array
// but it is more explicit about replacing the entire todo object
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }
  const idx = todos.findIndex((todo) => todo.id === parseInt(id, 10));
  if (idx === -1) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }
  todos.splice(idx, 1, { id: parseInt(id, 10), title });
  // Replace the entire todo object with a new one containing the id and title
  // This way, if there are other properties in the todo object, they will be replaced
  // If you want to update the title while keeping other properties, you can do:
  // todos[idx] = { ...todos[idx], title };
  // This will update the title while keeping other properties
  // If you want to update the entire todo object, you can do:
  // todos[idx] = { id: parseInt(id, 10), title };
  // This will replace the entire todo object with a new one containing only the id and title
  // This is useful if you want to replace the entire todo object with a new one
  // It is less efficient than the previous solution as it creates a new array
  // but it is more explicit about replacing the entire todo object
  res.json(todos);
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
