// const express = require("express");

// const configureMiddleware = require("./configure-middleware.js");
// const apiRouter = require("./api-router");

// const server = express();

// configureMiddleware(server);


// server.use("/api", apiRouter);

// module.exports = server;

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions); // to store sessions in database
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const knex = require("../database/dbConfig");

const server = express();

const sessionConfig = {
  // session storage options
  name: "session", // default would be sid
  secret: "keep it secret", //used for encryption (must be an environment variable )
  saveUninitialized: true, // has implications with GDPR laws
  resave: false,

  // how to store the sessions
  store: new KnexSessionStore({
    // DO NOT FORGET THE new KEYWORD
    knex, // imported from dbConfig.js
    tablename: "sessions",
    clearInterval: 1000 * 60 * 10, // technically optional defaults to 6000
    sidfieldname: "sid",

    //optional
    createtable: true,
  }),

  // cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, // session will be good for ten mins in milliseconds
    secure: false, // if false the cookie is sent over http if true only send over https
    httpOnly: true // if true JS cannot access the cookie
  }
};

server.use(helmet());
server.use(express.json());
server.use(cors({
   credentials: true,
   origin: 'http://localhost:3000'
}));
server.use(sessions(sessionConfig)); // adds a res.session object

server.use("/api", authRouter);
server.use("/auth/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
