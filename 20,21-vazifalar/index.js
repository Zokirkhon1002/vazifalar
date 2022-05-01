const express = require("express");
const app = express();
const winston = require("winston");

// logs and errors
require("./startup/logs")();
// config
require("./startup/config")();
// routes
require("./startup/routes")(app);
// mongoDB
require("./startup/db")();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  winston.info(`${PORT}chi portni eshitishni boshladim...`);
});
