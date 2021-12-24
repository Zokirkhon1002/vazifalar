const express = require("express");
const CategoriesRouter = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

// invoked for any requested passed to this router
// CategoriesRouter.use(function (req, res, next) {
//   res.send("It's working");
//   next();
// });

const categorySchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  link: String,
});

const Category = mongoose.model("Category", categorySchema);

const MasalalarToplami = [
  {
    id: 1,
    name: "Begin",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZltsFsYCKPbCbG54W60Qg7N",
  },
  {
    id: 2,
    name: "Integer",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZkZ6OyhfrbhwHKiDWzqpGfh",
  },
  {
    id: 3,
    name: "Boolean",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5Zk6JMhLjxuL7yzUx14B-W_N",
  },
  {
    id: 4,
    name: "If else",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZmL1mkRv97czibdcVQ8KRVJ",
  },
  {
    id: 5,
    name: "Switch Case",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5Zn2QqGVzVkN6ntz1ShH59UV",
  },
  {
    id: 6,
    name: "For Loop",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5Zln3l-jeNmMzAv-QCgguFQv",
  },
  {
    id: 7,
    name: "While",
    link: "https://youtube.com/playlist?list=PL6_0LObBt5ZlBJI9ooJUGA5xQnOmjY8b1",
  },
  { id: 8, name: "Series" },
  { id: 9, name: "MinMax" },
  { id: 10, name: "Function Simple" },
  { id: 11, name: "Array" },
  { id: 12, name: "String" },
  { id: 13, name: "Matrix" },
  { id: 14, name: "File" },
  { id: 15, name: "Text" },
  { id: 16, name: "Param" },
  { id: 17, name: "Recur" },
  { id: 18, name: "Tanlangan Masalalar" },
];

// categories
CategoriesRouter.get("/api/categories", async (req, res) => {
  const kata = await Category.find().sort("name");
  res.send(kata);
});

// post metodi
// create metodi
CategoriesRouter.post("/api/categories", async (req, res) => {
  const { err } = validateMasala(req.body);
  if (err) {
    return res.status(400).send(err.details[0].message);
  }

  let kategory = new Category({
    name: req.body.name,
    link: req.body.link
  });
  kategory = await kategory.save();
  res.status(201).send(kategory);
});

// id bo'yicha get metodi
CategoriesRouter.get("/api/categories/:id", async (req, res) => {
  let katagory = await Category.findById(req.params.id);
  if (!katagory)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

  res.send(katagory);
});

// put metodi
// update metod
CategoriesRouter.put("/api/categories/:id", async (req, res) => {
  const { err } = validateMasala(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, link: req.body.lin },
    { new: true }
  );

  if (!category)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar toifasi to'plami topilmadi");

  res.send(category);
});

// delete metodi
CategoriesRouter.delete("/api/categories/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id)
  if (!category)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

  
  res.send(category);
});

// validatsiya
function validateMasala(category) {
  const CategorySchema = Joi.object({
    name: Joi.string().required().min(3),
  });

  return Joi.validate(category, CategorySchema);
}

module.exports = CategoriesRouter;
