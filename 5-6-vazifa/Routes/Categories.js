const express = require("express");
const CategoriesRouter = express.Router();
const {Category, validateMasala} = require("../models/category")
// invoked for any requested passed to this router
// CategoriesRouter.use(function (req, res, next) {
//   res.send("It's working");
//   next();
// });



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


module.exports = CategoriesRouter;
