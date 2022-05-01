require("express-async-errors");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const [
  getAllCategories,
  postCategory,
  getCategoryById,
  updateCategoryById,
] = require("../controllers/catagories");



router.get("/", getAllCategories);
router.post("/", auth, postCategory);
router.get("/:id", getCategoryById);
router.put("/:id", auth, updateCategoryById);
router.delete("/:id", [auth, admin]);



module.exports = router;
