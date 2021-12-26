const express = require("express");
const CustomersRouter = express.Router();
const {validateCustomer, Customer} = require("../models/customer")


// invoked for any requested passed to this router
// CategoriesRouter.use(function (req, res, next) {
//   res.send("It's working");
//   next();
// });


// categories
CustomersRouter.get("/api/customer", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// post metodi
// create metodi
CustomersRouter.post("/api/customer", async (req, res) => {
  const { err } = validateCustomer(req.body);
  if (err) {
    return res.status(400).send(err.details[0].message);
  }

  let customers = new Customer({
    name: req.body.name,
    link: req.body.link,
    isVip: req.body.isVip,
    phone: req.body.phone,
  });
  customers = await customers.save();
  res.status(201).send(customers);
});

// id bo'yicha get metodi
CustomersRouter.get("/api/customer/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

  res.send(customer);
});

// put metodi
// update metod
CustomersRouter.put("/api/customer/:id", async (req, res) => {
  const { err } = validateCustomer(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      link: req.body.link,
      isVip: req.body.isVip,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar toifasi to'plami topilmadi");

  res.send(customer);
});

// delete metodi
CustomersRouter.delete("/api/customer/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

  res.send(customer);
});



module.exports = CustomersRouter;
