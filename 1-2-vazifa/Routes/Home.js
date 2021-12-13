// routes/Home.js
const express = require("express");
const HomeRouter = express.Router();

// invoked for any requested passed to this router
// HomeRouter.use(function (req, res, next) {
//   res.send("It's working");
//   next();
// });



// will handle any request that ends in /events
// depends on where the router is "use()'d"
HomeRouter.get("/", function (req, res, next) {
  let text = "Web sahifamizga xush kelibsiz";
  res.send(text);
  next();
});

HomeRouter.get("/home", function (req, res, next) {
    let text = "Assalomu alaykum Web sahifamizga xush kelibsiz!";
    res.send(text);
    next();
  });


module.exports = HomeRouter;