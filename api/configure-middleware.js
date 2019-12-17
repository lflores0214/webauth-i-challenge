const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions); // to store sessions in database

knex = require('../database/dbConfig')
const sessionConfig = {
  name: "sugar", // default name is sid
  secret: "keep it a secret", // used by encryption (must be an environment variable)
  saveUntilInitialized: false, // GDPR laws against setting cookies automatically. should only be true once a user agrees to let us set cookies for them
  resave: false,

  store: new KnexSessionStore({
    knex,
    tablename: "session",
    clearInterval: 1000 * 60 * 10,
    sidfieldname: "sid",

    createtable: true
  }),
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true,
  },
};
module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(sessions(sessionConfig));
};
