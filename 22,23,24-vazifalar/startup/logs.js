const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
require('dotenv').config()

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: "logs/vd-logs.log",
      level: "silly",
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: `${process.env.MONGO_URL}-logs`,
      level: "error",
    })
  );
  winston.add(new winston.transports.Console());

  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/vd-logs.log",
    })
  );

  process.on("unhandledRejection", (exception) => {
    throw exception;
  });

  // const myPromise = Promise.reject("yana boshqa xato").then("tugadi");
  // throw new Error("Kutilmagan Xato");
};
