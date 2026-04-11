const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please add an author"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    fileUrl: {
      type: String, // Path to the uploaded PDF/document
    },
    coverImage: {
      type: String, // Path to the uploaded image cover
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for fast search
bookSchema.index({ title: "text", author: "text", category: "text" });

module.exports = mongoose.model("Book", bookSchema);
