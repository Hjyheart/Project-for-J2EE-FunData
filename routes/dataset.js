var express = require('express');
var router = express.Router();

/* Dataset Home */
router.get('/', function(req, res, next) {
  res.render('./dataset/home', { title: 'Express' });
});

router.get('/lookup', function(req, res, next) {
  res.render('./dataset/lookup', { title: 'Express' });
});

/* Dataset Detail */
router.get('/:datasetName/detail', function(req, res, next) {
    console.log(req.params.datasetName);
    res.render('./dataset/detail', { title: req.params.datasetName });
});

module.exports = router;
