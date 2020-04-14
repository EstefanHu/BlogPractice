const router = require('express').Router();

router.route('/new').get((req, res) => {
  res.render('./articles/new');
});

module.exports = router;