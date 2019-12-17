const bcrypt = require("bcryptjs");
const router = require("express").Router();

const users = require("../users/users-model");

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
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}, you are now logged in`
        });
      } else {
      }
      res.status(401).json({
        errorMessage: "You shall not pass!"
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error during login"
      });
    });
});
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500);
      } else {
        req.status(200).json({
          message: "logged out"
        });
      }
    });
  } else {
    res.status(200).end();
  }
});
module.exports = router;
