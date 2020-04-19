var express = require('express');
var router = express.Router();
var main_controller = require('../controller/main');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weather', main_controller.weather);

module.exports = router;
