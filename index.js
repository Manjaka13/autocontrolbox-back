//Import .env file
require("dotenv").config();

//Run apollo server
const Apolloserver = require("./apolloServer");
new Apolloserver().run();
