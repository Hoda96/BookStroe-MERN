import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a new Book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({ mesasage: "not found 404 :(" });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
  }
  console.log(request);
  return response.status(200).send("Yay");
});
// Route to get all books from DB
router.get("/", async (request, response) => {
  try {
    const allBooks = await Book.find({});
    response.status(200).json({
      count: allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    console.error(`error ${error}`);
    response.status(500).send({ message: error.mesasage });
  }
});

// Route to get one book with id from DB
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    console.log(id);

    const oneBook = await Book.findById(id);
    return response.status(200).json(oneBook);
  } catch (error) {
    console.error(`error ${error}`);
    response.status(500).send({ message: error.mesasage });
  }
});

// Route to update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({ mesasage: "failed :(" });
    }

    const { id } = request.params;

    const updatedBook = await Book.findByIdAndUpdate(id, request.body);
    if (!updatedBook)
      return response.status(404).send({ mesasage: "not found 404 :(" });
    return response
      .status(200)
      .send({ message: "book updated succesfully :)" });
  } catch (error) {
    console.error(`error ${error}`);
    response.status(500).send({ message: error.mesasage });
  }
});

// Route to delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook)
      return response.status(404).send({ mesasage: "delete failed :(" });
    return response.status(200).send(deletedBook);
  } catch (error) {
    console.error(`error ${error}`);
    response.status(500).send({ message: error.mesasage });
  }
});

export default router;
