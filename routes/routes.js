const express = require("express");
const User = require("../models/user");

const app = express();

///////////////////// GET actions ///////////////////

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/secrets", (req, res) => {
  res.render("secrets");
});

///////////////////// POST actions ///////////////////

app.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  })

  await newUser.save((err) => {
    if(!err) {
      res.render("secrets");
    } else {
      res.send(err);
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, (err, foundUser) => {
    if(!err) {
      if(foundUser && foundUser.password === password) {
        console.log(foundUser.password);
        res.render("secrets");
      } else {
        res.send("Combination of username and password is not correct");
      }
    } else {
      res.send(err);
    }
  })
})

module.exports = app;
