
const express = require("express");
const router = express.Router();

const {
  getAllSpendingLimits,
  getSpendingLimit,
  createSpendingLimit,
  deleteSpendingLimit,
  updateSpendingLimit
} = require("../controllers/spendingLimitController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getAllSpendingLimits)
  .post(protect, createSpendingLimit);

router.route("/:id")
  .get(protect, getSpendingLimit)
  .delete(protect, deleteSpendingLimit)
  .patch(protect, updateSpendingLimit);

module.exports = router;