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

router.route('/').post(async (req, res, next) => {
  req.article = new Article();
  next();
}, saveArticleAndRedirect('new'));

// router.put('/:id', (req, res) => {
//   req.article
// }, saveArticleAndRedirect('edit'));

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
  
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch(error) {
      res.render(`articles/${path}`, { article: article });
    }
  }
}

module.exports = router;