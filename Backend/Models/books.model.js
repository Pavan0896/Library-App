const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    author: { type: String, require: true },
    language: { type: String, require: true },
    status: { type: String, require: true },
    price : { type: Number, require: true },
    user_id : { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("library", bookSchema);

module.exports = BookModel;
