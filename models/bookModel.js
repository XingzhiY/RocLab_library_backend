import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    PublishDate: {
      type: String,
      required: true,
    },
    Price: {
      type: Number, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);
