const express = require("express");
const CustomersRouter = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

// invoked for any requested passed to this router
// CategoriesRouter.use(function (req, res, next) {
//   res.send("It's working");
//   next();
// });

const customerSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  link: String,
  isVip: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Category", customerSchema);



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
    phone: req.body.phone
  });
  customers = await customers.save();
  res.status(201).send(customers);
});




// validatsiya
function validateCustomer(customer) {
    const customerSchema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      link: Joi.string(),
      isVip: Joi.boolean().required(),
      phone: Joi.number().min(5).max(50).required(),
    });
  
    return Joi.validate(customer, customerSchema);
  }
  


module.exports = CustomersRouter;