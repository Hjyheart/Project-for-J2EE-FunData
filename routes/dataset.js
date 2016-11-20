var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/lookup', function(req, res, next) {
  res.render('lookup', { title: 'Express' });
});

router.get('/:datasetName/detail', function(req, res, next) {
    console.log(req.params.datasetName);
    res.render('detail', { title: 'Express' });
});

module.exports = router;
