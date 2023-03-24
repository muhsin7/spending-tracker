
const express = require("express");
const router = express.Router();

const { getAllSpendingLimits, getSpendingLimit, createSpendingLimit, deleteSpendingLimit, updateSpendingLimit, getSpendingLimitByCategory } = require("../controllers/spendingLimitController");
const { protect } = require("../middleware/authMiddleware");
const { mustOwnValidCategory, mustOwnValidSpendingLimit } = require("../middleware/spendingLimitMiddleware");

router.route("/")
  .get(protect, getAllSpendingLimits)
  .post(protect, mustOwnValidCategory, createSpendingLimit);

router.route("/byCategory/:categoryId")
  .get(protect, getSpendingLimitByCategory);

router.route("/:id")
  .get(protect, mustOwnValidSpendingLimit, getSpendingLimit)
  .delete(protect, mustOwnValidSpendingLimit, deleteSpendingLimit)
  .patch(protect, mustOwnValidSpendingLimit, updateSpendingLimit);

module.exports = router;