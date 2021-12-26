const Joi = require("joi");
const mongoose = require("mongoose");

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
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

// validatsiya
function validateCustomer(customer) {
  const customerSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    link: Joi.string(),
    isVip: Joi.boolean().required(),
    phone: Joi.string().min(5).max(50).required(),
  });

  return Joi.validate(customer, customerSchema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;