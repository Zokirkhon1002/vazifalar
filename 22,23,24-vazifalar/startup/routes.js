const express = require("express");
const categoriesRoute = require("../routes/categories");
const customersRoute = require("../routes/customers");
const coursesRoute = require("../routes/courses");
const entrollmentsRoute = require("../routes/enrollments");
const routerUser = require("../routes/users");
const authRoute = require("../routes/auth");
const errorMiddleWare = require("../middleware/error");



module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categoriesRoute);
  app.use("/api/customers", customersRoute);
  app.use("/api/courses", coursesRoute);
  app.use("/api/enrollments", entrollmentsRoute);
  app.use("/api/users", routerUser);
  app.use("/api/auth", authRoute);
  app.use(errorMiddleWare);
};
