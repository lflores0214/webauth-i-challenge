const express = require("express");
const users = require("./users-model");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  users
    .add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error saving user"
      });
    });
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  users
    .findBy({ username })
    .first()
    .then(user => {
      user && bcrypt.compareSync(password, user.password)
        ? res.status(200).json({
            message: `Welcome ${user.username}, you are now logged in`
          })
        : res.status(401).json({
            errorMessage: "You shall not pass!"
          });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "error during login"
        })
    })
});
router.get("/", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error retrieving users"
      });
    });
});
module.exports = router;
