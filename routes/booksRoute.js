import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    //get all parameters
    if (
      !request.body.Title ||
      !request.body.Author ||
      !request.body.PublishDate||
      !request.body.Price
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    //generate a new book from the parameters
    const newBook = {
      Title: request.body.Title,
      Author: request.body.Author,
      PublishDate: request.body.PublishDate,
      Price: request.body.Price,
    };
    //insert the book into the database
    const book = await Book.create(newBook);
    //sand it back
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    //find all books in the database
    const books = await Book.find({});
    //return a json of books
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    //get id from request parameters
    const { id } = request.params;
    //fight book in the database
    const book = await Book.findById(id);
    //return the book in json
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    //get id from parameters
    const { id } = request.params;
    //thanks the book and  deleted by id
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    //simple response
    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
