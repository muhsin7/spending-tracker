const express = require("express");
const router = express.Router();


const {getPayments, getSummary, getPayment, createPayment, deletePayment, updatePayment} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const { mustOwnValidCategory, mustOwnValidPayment } = require("../middleware/paymentMiddleware");

router.route("/")
  .get(protect, getPayments)
  .post(protect, mustOwnValidCategory, createPayment);

router.route("/summary")
  .get(protect, getSummary);

router.route("/:id")
  .get(protect, mustOwnValidPayment, getPayment)
  .delete(protect, mustOwnValidPayment, deletePayment)
  .patch(protect, mustOwnValidPayment, updatePayment);

module.exports = router;