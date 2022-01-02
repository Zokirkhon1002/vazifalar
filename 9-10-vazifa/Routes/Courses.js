const express = require("express");
const CoursesRouter = express.Router();
const {Author, Course, validateCourse} = require("../models/course")
// invoked for any requested passed to this router
// CategoriesRouter.use(function (req, res, next) {
//   res.send("It's working");
//   next();
// });









// courses users
CoursesRouter.get("/api/courses/users", async (req, res) => {
    const course = await Author.find().sort("firstName")
    res.send(course);
  });

// post metodi
// create metodi
CoursesRouter.post("/api/courses/users", async (req, res) => {
    const { err } = validateCourse(req.body);
    if (err) {
      return res.status(400).send(err.details[0].message);
    }
  
    let user = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        hobby: req.body.hobby,
    });
    user = await user.save();
    res.status(201).send(user);
  });

  // id bo'yicha get metodi
CoursesRouter.get("/api/courses/users/:id", async (req, res) => {
    let user = await Author.findById(req.params._id);
    if (!user)
      return res
        .status(404)
        .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");
  
    res.send(user);
  });


// put metodi
// ishlamadi
// update metod
CoursesRouter.put("/api/courses/users/:id", async (req, res) => {
    const { err } = validateCourse(req.body);
    if (err) return res.status(400).send(err.details[0].message);
  
    let user = await Author.findByIdAndUpdate(
      req.params.id,
      { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        hobby: req.body.hobby
        },
      { new: true }
    );
  
    if (!user)
      return res
        .status(404)
        .send("Berilgan IDga teng bo'lgan foydalanuvchi topilmadi");
  
    res.send(user);
  });
  
// delete metodi
CoursesRouter.delete("/api/courses/users/:id", async (req, res) => {
    const user = await Author.findByIdAndRemove(req.params.id)
    if (!user)
      return res
        .status(404)
        .send("Berilgan IDga teng bo'lgan Foydalaanuvchi topilmadi");
  
    
    res.send(user);
  });
  














// courses
CoursesRouter.get("/api/courses", async (req, res) => {
    const course = await Course
    .find()
    .populate("author", 'firstName')
    res.send(course);
  });

// post metodi
// create metodi
CoursesRouter.post("/api/courses", async (req, res) => {
  const { err } = validateCourse(req.body);
  if (err) {
    return res.status(400).send(err.details[0].message);
  }

  let course = new Course({
    name: req.body.name,
    link: req.body.link,
    author: req.body.author,
    tags: req.body.tags
  });
  course = await course.save();
  res.status(201).send(course);
});

// id bo'yicha get metodi
CoursesRouter.get("/api/courses/:id", async (req, res) => {
  let course = await Course.findById(req.params.id);
  if (!course)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

  res.send(course);
});

// put metodi
// update metod
CoursesRouter.put("/api/courses/:id", async (req, res) => {
  const { err } = validateCourse(req.body);
  if (err) return res.status(400).send(err.details[0].message);

  let course = await Course.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, link: req.body.link, author: req.body.author, tags: req.body.tags },
    { new: true }
  );

  if (!course)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar toifasi to'plami topilmadi");

  res.send(course);
});

// delete metodi
CoursesRouter.delete("/api/courses/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id)
  if (!course)
    return res
      .status(404)
      .send("Berilgan IDga teng bo'lgan Masalalar to'plami topilmadi");

  
  res.send(course);
});









module.exports = CoursesRouter;
