const { text } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
  {
    id: uuidv(),
    username: "Todd",
    comment: "lol that is so funny11111",
  },
  {
    id: uuidv(),
    username: "jew",
    comment: "lol that is so funny22222",
  },
  {
    id: uuidv(),
    username: "fad",
    comment: "lol that is so funny33333",
  },
  {
    id: uuidv(),
    username: "wad",
    comment: "lol that is so funny44444",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Okay, here are your ${qty} ${meat} tacos`);
});

app.listen(3000, () => {
  console.log("Listening 3000");
});

// GET /comments -list all comments
// POST /comments - create a new comment
// GET /comments/:id - get particular comment using ID
// PATCH  /comments/:id - update one comment
// DELETE /comments/:id - destrony one comment
