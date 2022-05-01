const { Enrollment, validate } = require("../models/enrollment");
const { Course } = require("../models/course");
const { Customer } = require("../models/customer");

// METHOD ==> GET
// desc: get all enrolments
const getAllEnrolments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort("-dateStart");
    res.send(enrollments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Serverda kutilmagan xatolik yuz berdi!");
  }
};

// METHOD ==> GET
// desc: get one enrolment by id
const getEnrolmentById = async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment)
    return res.status(404).send("Berilgan IDga teng bo'lgan qabul topilmadi.");

  res.send(enrollment);
};

// METHOD ==> PUT
// desc: creating enrolment
const postingEnrolment = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

  const course = await Course.findById(req.body.courseId);
  if (!course)
    return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

  let enrollment = new Enrollment({
    customer: {
      _id: customer._id,
      name: customer.name,
    },
    course: {
      _id: course._id,
      title: course.title,
    },
    courseFee: course.fee,
  });
  if (customer.isVip) enrollment.courseFee = course.fee - 0.2 * course.fee; //Vip mijozlarga 20% chegirma

  enrollment = await enrollment.save();

  customer.bonusPoints++;
  customer.save();

  res.send(enrollment);
};

module.exports = [getAllEnrolments, postingEnrolment, getEnrolmentById];
