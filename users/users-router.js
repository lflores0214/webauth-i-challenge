const router = require("express").Router()
const users = require("./users-model");
const restricted = require('../api/restricted-middlware')




router.get("/", restricted, (req, res) => {
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
