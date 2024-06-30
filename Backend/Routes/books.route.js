const express = require("express");
const auth = require("../Middlewares/auth");
const BookModel = require("../Models/books.model");
const {
  addBooks,
  getBooks,
  updateBooks,
  deleteBooks,
  paginateBooks,
  filterBooks,
  sortBooks,
  searchBooks,
} = require("../Controllers/library.controller");

const bookRouter = express.Router();

bookRouter.post("/books", auth, addBooks);

bookRouter.get("/books", auth, getBooks);

bookRouter.patch("/updateBook/:id", auth, updateBooks);

bookRouter.delete("/deleteBook/:id", auth, deleteBooks);

bookRouter.get("/book", auth, paginateBooks);

bookRouter.get("/bookFilter", auth, filterBooks);

bookRouter.get("/bookSort", auth, sortBooks);

bookRouter.get("/bookSearch", auth, searchBooks);

module.exports = bookRouter;
