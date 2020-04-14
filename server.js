const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/article');

mongoose.connect('mongodb://localhost/blogTest', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'desc'
  });
  res.render('./articles/index', { articles: articles });
});

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

app.listen('4000', () => console.log('Listening on Port 4000'));