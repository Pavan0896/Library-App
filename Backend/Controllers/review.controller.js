const ReviewModel = require("../Models/review.model");

const addreviews = async (req, res) => {
  const { userName, review, rating, user_id } = req.body;
  const book_id = req.params.id;
  console.log(book_id);
  try {
    let reviews = new ReviewModel({
      userName,
      review,
      rating,
      user_id,
      book_id,
    });
    await reviews.save();
    res.status(200).send({ message: "Book review successful" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const getReviews = async (req, res) => {
  try {
    let reviews = await ReviewModel.aggregate([
      { $project: { review: 1, rating: 1, _id: 0, userName: 1 } },
    ]);
    res.status(200).send({ message: "Success", data: reviews });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const updateReviews = async (req, res) => {
  const { user_id, review, rating } = req.body;
  const _id = req.params.id;
  try {
    let reviews = await ReviewModel.findOne({ _id });
    if (reviews.user_id !== user_id) {
      res.status(403).send({ message: "Not authorised" });
    } else {
      await ReviewModel.updateOne(
        { _id, user_id },
        { $set: { review, rating } }
      );
      res.status(200).send({ message: "Updated Successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const deleteReviews = async (req, res) => {
  const { user_id } = req.body;
  const _id = req.params.id;
  try {
    let reviews = await ReviewModel.findOne({ _id });
    if (reviews.user_id == user_id) {
      await ReviewModel.findByIdAndDelete({ _id });
      res.status(200).send({ message: "Deleted Successfully" });
    } else {
      res.status(403).send({ message: "Not authorised" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Error" });
  }
};

module.exports = { addreviews, getReviews, updateReviews, deleteReviews };
