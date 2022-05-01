const express = require("express");
const router = express.Router();
const [
  getAllEnrolments,
  postingEnrolment,
  getEnrolmentById,
] = require("../controllers/enrolments");

router.get("/", getAllEnrolments);
router.post("/", postingEnrolment);
router.get("/:id", getEnrolmentById);

module.exports = router;
