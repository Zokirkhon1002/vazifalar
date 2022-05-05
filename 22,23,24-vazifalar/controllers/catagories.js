const { Category, validate } = require("../models/category");
const mongoose = require("mongoose");

// METHOD ==> GET
// desc: get All Categories
const getAllCategories = async (req, res) => {
  try {
    // throw new Error("Toifalarni olishda kutilmagan xato yuz berdi")
    const categories = await Category.find().sort("name");
    res.send(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send("Serverda Kutilmagan xato yuz berdi");
  }
};

// METHOD ==> POST
// desc: post one category
const postCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();

  res.status(201).send(category);
};

// METHOD ==> GET
// desc: get category by id
const getCategoryById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Yaroqsiz Id");
  }
  let category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
};

// METHOD ==> PUT
// desc: update category by id
const updateCategoryById = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
};
// METHOD ==> DELETE
// desc: delete category by id
const deleteCategoryById = async (req, res) => {
  let category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");

  res.send(category);
};

module.exports = [
  getAllCategories,
  postCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
];
