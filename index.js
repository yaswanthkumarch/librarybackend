require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const { title, author, genre, price } = req.body;
  const newBook = new Book({ title, author, genre, price });
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
    console.log("new book added");
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(500).json({ message: 'Failed to add book' });
  }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, price } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, price }, { new: true });
    res.json(updatedBook);
    console.log("Book is updated");
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book' });
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
   
    res.json({ message: 'Book deleted' });
    console.log("book Deleted");
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
