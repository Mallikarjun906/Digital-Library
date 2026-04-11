const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getBooks)
  .post(
    protect,
    admin,
    upload.fields([{ name: "file", maxCount: 1 }, { name: "cover", maxCount: 1 }]),
    createBook
  );

router
  .route("/:id")
  .get(getBookById)
  .put(
    protect,
    admin,
    upload.fields([{ name: "file", maxCount: 1 }, { name: "cover", maxCount: 1 }]),
    updateBook
  )
  .delete(protect, admin, deleteBook);

module.exports = router;
