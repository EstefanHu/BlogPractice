const router = require('express').Router();
const Article = require('./../models/article');

router.route('/new').get((req, res) => {
  res.render('./articles/new', { article: new Article() });
});

router.route('/edit/:id').get(async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('./articles/edit', { article: article });
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

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;