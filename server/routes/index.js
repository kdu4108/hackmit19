var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  readCSV.readCSV('speed_vs_time.csv').then(function(data) {
    res.render('index', { title: 'Express', speedVsTime: data});
  });
});

module.exports = router;
