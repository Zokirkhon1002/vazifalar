const express = require("express");
const router = express.Router();
const [
  getAllCourses,
  postingCourse,
  updatingCourseById,
  getCourseById,
  deleteCourseById,
] = require("../controllers/courses");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", postingCourse);
router.put("/:id", updatingCourseById);
router.delete("/:id", deleteCourseById);

module.exports = router;
