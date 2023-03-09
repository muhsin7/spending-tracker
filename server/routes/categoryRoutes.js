
const express = require("express");
const router = express.Router();

const {getCategories, getCategory, createCategory, deleteCategory, updateCategory} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { mustOwnValidCategory } = require("../middleware/categoryMiddleware");

router.route("/")
  .get(protect, getCategories)
  .post(protect, createCategory);

router.route("/:id")
  .get(protect, mustOwnValidCategory, getCategory)
  .delete(protect, mustOwnValidCategory, deleteCategory)
  .patch(protect, mustOwnValidCategory, updateCategory);

module.exports = router;