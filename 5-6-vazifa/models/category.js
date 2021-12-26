const Joi = require("joi");
const mongoose = require("mongoose");

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

const Category = mongoose.model("CategoryBeshinchiVazifa", categorySchema);

// validatsiya
function validateMasala(category) {
  const CategorySchema = Joi.object({
    name: Joi.string().required().min(3),
  });

  return Joi.validate(category, CategorySchema);
}

exports.Category = Category;
exports.validateMasala = validateMasala;