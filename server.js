const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogTest', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const articles = [
    {
      title: 'Test article',
      createdAt: new Date,
      description: 'Test Description'
    },
    {
      title: 'Test article2',
      createdAt: new Date,
      description: 'Test Description2'
    }
  ];
  res.render('./articles/index', { articles: articles });
});

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

app.listen('4000', () => console.log('Listening on Port 4000'));