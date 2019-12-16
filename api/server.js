const express = require("express");

const configureMiddleware = require("./configure-middleware.js");
const userRouter = require("../users/users-router");

const server = express();

configureMiddleware(server);


server.use("/users", userRouter);

module.exports = server;
