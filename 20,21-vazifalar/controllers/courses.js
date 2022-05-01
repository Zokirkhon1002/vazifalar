const { Course, validate } = require("../models/course");
const { Category } = require("../models/category");

// METHOD ==> GET
// desc: get All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort("title");
    res.send(courses);
  } catch (err) {
    console.log(err);
    res.status(500).send("Serverda kutilmagan xatolik yuz berdi!");
  }
};
// METHOD ==> GET
// desc: get one Course by id
const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

  res.send(course);
};
// METHOD ==> POST
// desc: post one Course
const postingCourse = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category)
    return res.status(400).send("Berilgan IDga teng bo'lgan toifa topilmadi.");

  let course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    trainer: req.body.trainer,
    tags: req.body.tags,
    status: req.body.status,
    fee: req.body.fee,
  });
  course = await course.save();

  res.send(course);
};

// METHOD ==> PUT
// desc: update one Course by id
const updatingCourseById = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category)
    return res.status(400).send("Berilgan IDga teng bo'lgan toifa topilmadi.");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      trainer: req.body.trainer,
      tags: req.body.tags,
      status: req.body.status,
      fee: req.body.fee,
    },
    { new: true }
  );

  if (!course)
    return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

  res.send(course);
};

// METHOD ==> DELETE
// desc: delete one Course by id
const deleteCourseById = async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if (!course)
    return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

  res.send(course);
};

module.exports = [
  getAllCourses,
  postingCourse,
  updatingCourseById,
  getCourseById,
  deleteCourseById,
];
