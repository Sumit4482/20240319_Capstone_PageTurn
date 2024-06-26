const mongoose = require('mongoose');
const tags = require('../constants/tags');
const {reviewSchema} = require('../models/review.model');
/**
 * Represents a book in the Pageturn application.
 * @typedef {Object} Book
 * @property {string} isbn - International Standard Book Number
 * @property {string} title - The title of the book.
 * @property {string[]} authors - The authors of the book.
 * @property {string} genre - The genre of the book.
 * @property {string} description - The description of the book.
 * @property {number} averageRating - The average rating of the book.
 * @property {number} totalRatings - The total number of ratings given to the book.
 * @property {Review[]} reviews - The reviews associated with the book.
 * @property {Date} publishedDate - The published date of the book.
 * @property {string} coverImage - The URL of the book's cover image.
 * @property {Date} createdAt - The date when the book was added to the system.
 */

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: String,
    required: true
  }],
  genre: {
    type: String,
    enum: tags,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  reviews:{
    type: [reviewSchema],
    required:true
  },
  publishedDate: {
    type: Date
  },
  coverImage: {
    type: String
  },
  language: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  edition: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
