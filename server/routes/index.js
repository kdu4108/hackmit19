var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  readCSV.readCSV('time_v_speed.csv', 200).then(function(data) {
    res.render('index', { title: 'Express', timeVsSpeed: data});
  });
});

/* GET cities page. */
router.get('/cities', function(req, res, next) {
  readCSV.readCSV('cities_avg_mpg.csv', 200).then(function(data) {
    res.render('cities', { title: 'Express', mpg_per_city: data});
  });
});

module.exports = router;
