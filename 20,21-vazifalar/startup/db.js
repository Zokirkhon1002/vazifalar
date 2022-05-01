const mongoose = require("mongoose");
const winston = require("winston");
require('dotenv').config()

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      winston.debug("MongoDBga ulanish hosil qilindi...");
    });

  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
};
