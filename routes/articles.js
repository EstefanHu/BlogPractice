const router = require('express').Router();

router.route('/new').get((req, res) => {
  res.render('./articles/new');
});

router.route('/', (req, res) => {

});

module.exports = router;