const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema
  ({
    userName: { type: String, require: true },
    review: { type: String, require: true },
    rating: { type: Number, require: true },
    user_id: { type: String, require: true },
    book_id:{ type: String, require: true },
  },
  {
    versionKey: false,
  });

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = ReviewModel;
