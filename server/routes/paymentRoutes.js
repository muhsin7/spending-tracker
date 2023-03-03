const express = require("express");
const router = express.Router();


const {getPayments, getSummary, getPayment, createPayment, deletePayment, updatePayment} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getPayments)
  .post(protect, createPayment);

router.route("/summary")
  .get(protect, getSummary);

router.route("/:id")
  .get(protect, getPayment)
  .delete(protect, deletePayment)
  .patch(protect, updatePayment);

module.exports = router;