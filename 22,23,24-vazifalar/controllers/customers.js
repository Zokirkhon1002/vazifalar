const { Customer, validate } = require("../models/customer");

// METHOD ==> GET
// desc: get all customers
const getAllCostumers = async (req, res) => {
  try {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  } catch (err) {
    console.log(err);
    res.status(500).send("Serverda kutilmagan xatolik yuz berdi!");
  }
};

// METHOD ==> GET
// desc: get one costumer by id
const getCostumerById = async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

  res.send(customer);
};
// METHOD ==> POST
// desc: post(create) one costumer
const creatingCostumer = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isVip: req.body.isVip,
    phone: req.body.phone,
    bonusPoints: 0,
  });
  customer = await customer.save();

  res.status(201).send(customer);
};

// METHOD ==> PUT
// desc: update customer by id
const updateCostumerById = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!customer)
    return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

  res.send(customer);
};

// METHOD ==> DELETE
// desc: delete customer by id
const deleteCostumerById = async (req, res) => {
  let customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

  res.send(customer);
};

module.exports = [
  getAllCostumers,
  getCostumerById,
  creatingCostumer,
  updateCostumerById,
  deleteCostumerById,
];
