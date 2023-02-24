
const express = require("express");
const router = express.Router();

const {getCategories, getCategory, createCategory, deleteCategory, updateCategory} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getCategories)
  .post(protect, createCategory);

router.route("/:id")
  .get(protect, getCategory)
  .delete(protect, deleteCategory)
  .patch(protect, updateCategory);

module.exports = router;