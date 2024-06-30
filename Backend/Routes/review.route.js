const express = require("express");
const auth = require("../Middlewares/auth");
const {
  addreviews,
  getReviews,
  updateReviews,
  deleteReviews,
} = require("../Controllers/review.controller");

const reviewRouter = express.Router();

reviewRouter.post("/review/:id", auth, addreviews);

reviewRouter.get("/review", auth, getReviews);

reviewRouter.patch("/reviewUpdate/:id", auth, updateReviews);

reviewRouter.delete("/reviewDelete/:id", auth, deleteReviews);

module.exports = reviewRouter;
