const router = require('express').Router();
const Article = require('./../models/article');

router.route('/new').get((req, res) => {
  res.render('./articles/new', { article: new Article() });
});

router.route('/:slug').get(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article });
});

router.route('/').post(async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch(error) {
    console.log(error);
    res.render('articles/new', { article: article });
  }
});

module.exports = router;