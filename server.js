const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

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
  res.render('index', { articles: articles });
});

app.listen('4000', () => console.log('Listening on Port 4000'));