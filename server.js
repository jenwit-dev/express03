require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");

const todos = [
  { id: 11, title: "Learn HTML" },
  { id: 22, title: "Learn CSS" },
  { id: 33, title: "Learn JS" },
];

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded()); // Middleware to parse URL-encoded bodies
// On Thunder Client, GET http://localhost:8080/todos/11?_page=2&_limit=20

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { _page, _limit } = req.query;
  console.log(req.params); // { id: '11' }
  console.log(typeof id); // 'string'
  console.log(req.query); //  { _page: '2', _limit: '20' }
  console.log(typeof _page); // 'string'
  const todo = todos.find((todo) => todo.id === parseInt(id, 10));
  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }
  todo["_page"] = _page;
  todo._limit = _limit; // Adding query parameters to the todo object
  res.json(todo);
});

app.post("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, num, age } = req.body;
  console.log(req.body); // { age: '25' }
  // console.log(typeof title); // 'string'
  // console.log(typeof num); // number
  console.log(typeof age); // 'string'
  todos.push({ ...req.body, id: parseInt(id, 10) });
  res.json(todos);
});

// On Thunder Client, Correct Path : GET "https://cataas.com/api/cats"
app.get("/cat", (req, res, next) => {
  axios
    .get("https://cataas.com/api/qqq")
    .then((result) => {
      console.log(result); // object (axios response) ยังไม่ใช่ข้อมูลที่เราต้องการจริงๆ
      console.log(result.data); // array (info we need to send to the client)
      res.json(result.data);
    })
    // .catch((err) => {
    //   // console.log(err.message);
    //   next(err); // Pass the error to the error handling middleware
    // });
    .catch(next); // Pass the error to the error handling middleware (shorthand next with no parentheses, exclusive for only .then syntax, async await can't use shorthand next syntax like this)
  // res.json({ msg: "This is a mock response" }); // This line is just for demonstration purposes
  // This endpoint fetches a list of cats from the Cataas API
  // and returns it as a JSON response.
  // The Cataas API provides a list of cats with their details.
});

// On Thunder Client, Correct Path : GET "https://cataas.com/api/cats"
// app.get("/cat", async (req, res, next) => {
//   try {
//     const result = await axios.get("https://cataas.com/api/qqq"); // incorrect path to demonstrate error handling
//     console.log(result.data); // This will log the array of cats
//     res.json(result.data); // Send the array of cats as a JSON response
//   } catch (err) {
//     next(err);
//   }
// });

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
//   todos.splice(idx, 1, { id: parseInt(id, 10), title });
//   // Replace the entire todo object with a new one containing the id and title
//   // This way, if there are other properties in the todo object, they will be replaced
//   // If you want to update the title while keeping other properties, you can do:
//   // todos[idx] = { ...todos[idx], title };
//   // This will update the title while keeping other properties
//   // If you want to update the entire todo object, you can do:
//   // todos[idx] = { id: parseInt(id, 10), title };
//   // This will replace the entire todo object with a new one containing only the id and title
//   // This is useful if you want to replace the entire todo object with a new one
//   // It is less efficient than the previous solution as it creates a new array
//   // but it is more explicit about replacing the entire todo object
//   res.json(todos);
// });

// app.get("/todos", (req, res) => {
//   res.json(todos);
// });

app.get("/qqq", (req, res) => {
  console.log(qqq); // This will throw an error because qqq is not defined
  // This is just to demonstrate error handling
  // In a real application, you would not have this line
  // Instead, you would have your application logic here
  // For example, you might want to return a list of todos or some other data
  // But for this example, we are just throwing an error to demonstrate error handling
  // throw new Error("This is an error");
  // This will throw an error and the error handling middleware will catch it
  // and return a 500 Internal Server Error response
  // You can also use console.log to log the error to the console
  // This is useful for debugging purposes
  res.json({
    message: "Hello World",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server on port", port));
