const Book = require("../models/Book");

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          $text: { $search: req.query.keyword },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const books = await Book.find({ ...keyword, ...category })
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "uploadedBy",
      "name email"
    );

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res, next) => {
  try {
    const { title, author, category, description } = req.body;
    let fileUrl = "";
    let coverImage = "";

    if (req.files) {
      if (req.files.file) {
        fileUrl = `/uploads/${req.files.file[0].filename}`;
      }
      if (req.files.cover) {
        coverImage = `/uploads/${req.files.cover[0].filename}`;
      }
    }

    const book = new Book({
      title,
      author,
      category,
      description,
      fileUrl,
      coverImage,
      uploadedBy: req.user._id,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res, next) => {
  try {
    const { title, author, category, description } = req.body;
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.category = category || book.category;
      book.description = description || book.description;

      if (req.files) {
        if (req.files.file) {
          book.fileUrl = `/uploads/${req.files.file[0].filename}`;
        }
        if (req.files.cover) {
          book.coverImage = `/uploads/${req.files.cover[0].filename}`;
        }
      }

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await book.deleteOne();
      res.json({ message: "Book removed" });
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
