const BookModel = require("../Models/books.model");

const addBooks = async (req, res) => {
  const { title, author, language, status, price, user_id } = req.body;
  try {
    let books = new BookModel({ title, author, language, status, price, user_id });
    await books.save();
    res.status(200).send({ message: "Book added to DB successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).send({ message: "Success", data: books });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const updateBooks = async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  try {
    await BookModel.findByIdAndUpdate({ _id: id }, { $set: { status } });
    res.status(200).send({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const deleteBooks = async (req, res) => {
  const id = req.params.id;
  try {
    await BookModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const paginateBooks = async (req, res) => {
  const { page, limit } = req.query;
  let pageSkip = (page - 1) * limit;
  try {
    const books = await BookModel.find().skip(pageSkip).limit(limit);
    res.status(200).send({ message: "Success", data: books });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const filterBooks = async (req, res) => {
  const { status } = req.query;
  try {
    const books = await BookModel.find({ status });
    res.status(200).send({ message: "Success", data: books });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const sortBooks = async (req, res) => {
  const { sort, order } = req.query;
  let query = { sort: order };
  console.log(query);

  try {
    let books = await BookModel.find().sort({ price: +order });
    res.status(200).send({ message: "Success", data: books });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

const searchBooks = async (req, res) => {
  const { title, author } = req.query;
  let query = {};
  try {
    if (title) {
      query.title = new RegExp(title, "i");
    }
    if (author) {
      query.author = new RegExp(author, "i");
    }
    const books = await BookModel.find(query);
    res.status(200).send({ message: "Success", data: books });
  } catch (error) {
    res.status(500).send({ message: "Internal error" });
  }
};

module.exports = {
  addBooks,
  getBooks,
  updateBooks,
  deleteBooks,
  paginateBooks,
  filterBooks,
  sortBooks,
  searchBooks,
};
