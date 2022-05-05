const express = require("express");
const router = express.Router();
const [
  getAllCostumers,
  getCostumerById,
  creatingCostumer,
  updateCostumerById,
  deleteCostumerById,
] = require("../controllers/customers");

router.get("/", getAllCostumers);
router.get("/:id", getCostumerById);
router.post("/", creatingCostumer);
router.put("/:id", updateCostumerById);
router.delete("/:id", deleteCostumerById);

module.exports = router;
