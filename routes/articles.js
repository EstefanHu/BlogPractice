const router = require('express').Router();
const Article = require('./../models/article');

router.route('/new').get((req, res) => {
  res.render('./articles/new', { article: new Article() });
});

router.route('/:id').get((req, res) => {

});

router.route('/').post(async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch(error) {
    res.render('articles/new', { article: article });
  }
});

module.exports = router;