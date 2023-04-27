const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json() )

app.listen(process.env.PORT || PORT);

app.post('/book', (req, res) => {
    const { title, author, pages } = req.body;
  
    if (!title || !author || !pages) {
      res.status(400).send({ message: 'Missing title or author parameter' });
      return;
    }
  
    const maxId = books.reduce((max, book) => Math.max(max, book.id), 0);
    const newBook = {
      id: maxId + 1,
      title,
      author,
      pages
    };
    books.push(newBook);
  
    res.status(201).send({
      message: 'Book added successfully',
      book: newBook
    });
  });

const books = [];

app.get('/book/:id', (req, res) => {
  const { id } = req.params;

  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    res.status(404).send({ message: 'Book not found' });
    return;
  }

  res.status(200).send(book);
});

app.get('/books', (req, res) => {
  res.status(200).send(books);
});

app.put('/book/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, pages } = req.body;
  
    if (!title && !author && !pages) {
      res.status(400).send({ message: 'Missing title or author parameter' });
      return;
    }
  
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));
  
    if (bookIndex === -1) {
      res.status(404).send({ message: 'Book not found' });
      return;
    }
  
    const updatedBook = {
      id: parseInt(id),
      title: title || books[bookIndex].title,
      author: author || books[bookIndex].author,
      pages: pages || books[bookIndex].pages
    };
  
    books.splice(bookIndex, 1, updatedBook);
  
    res.status(200).send({
      message: 'Book updated successfully',
      book: updatedBook
    });
  });

  app.delete('/book/:id', (req, res) => {
    const { id } = req.params;
  
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));
  
    if (bookIndex === -1) {
      res.status(404).send({ message: 'Book not found' });
      return;
    }
  
    books.splice(bookIndex, 1);
  
    res.status(200).send({ message: 'Book deleted successfully' });
  });  

app.delete('/books', (req, res) => {
  books.length = 0;

  res.status(200).send({ message: 'All books deleted successfully' });
});
