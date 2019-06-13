require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
app.use(express.json());
const session = require("express-session");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const port = SERVER_PORT || 4000;

const {
  userInfo,
  login,
  register,
  changeName,
  changePic,
  changeUserData,
  logout
} = require("./controller/authController");

const {
  getPosts,
  createPost,
  updatePost,
  deletePost
} = require("./controller/dungeonMaster");

const {
  getCharacters,
  addCharacter,
  deleteCharacter
} = require("./controller/characterController");

app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1209600000
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

// auth endpoints
app.get("/api/user", userInfo);
app.post("/api/register", register);
app.post("/api/login", login);
// app.put("/api/user/:id", changeName);
// app.put("/api/userPic/:id", changePic);
app.put("/api/user/:id", changeUserData);
app.get("/api/logout", logout);

//post endpoints
app.get("/api/posts/:id", getPosts);
app.post("/api/post", createPost);
app.put("/api/post/:id", updatePost);
app.delete("/api/post", deletePost);

//controller endpoints
app.get("/api/char/:id", getCharacters);
app.post("/api/newChar/:id", addCharacter);
app.delete("/api/char", deleteCharacter);

const path = require("path");

app.listen(port, () => console.log(`Listening on port ${port}`));
