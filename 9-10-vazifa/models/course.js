const Joi = require("joi");
const mongoose = require("mongoose");


const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    email: String,
    phone: String,
    status: String,
    hobby: String,
  })


const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    link: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    tags: Array
  });

const Author = mongoose.model("Author",authorSchema);
const Course = mongoose.model("course", courseSchema);

// validatsiya
function validateCourse(course) {
  const CourseSchema = Joi.object({
    name: Joi.string().required().min(3),
  });

  return Joi.validate(course, CourseSchema);
}

exports.Course = Course;
exports.Author = Author;
exports.validateCourse = validateCourse;
