var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js')

/* GET cities page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Welcome!'});
});

/* GET home page. */
router.get('/behaviors', function(req, res, next) {
  var names = ['Aggressive Driving', 'Commute', 'Highway Speeding', 'Idling', 'Riding Brakes', 'Tailgating'];
  var fileNames = ['aggressive-driving', 'commute', 'highway-speeding', 'idling', 'riding-brakes', 'tailgating'];
  var filePromises = fileNames.map(function(fileName) {
    return readCSV.readCSV('behaviors/' + fileName + '.csv', 200);
  });


  Promise.all(filePromises).then(function(csvDatas) {
    readCSV.readCSV('behaviors/mpg_data.csv').then(function(mpgData) {
      res.render('index', {title: 'expression', names: names, csvDatas: csvDatas, mpgData: mpgData });
    })
  })
});

/* GET cities page. */
router.get('/cities', function(req, res, next) {
  readCSV.readCSV('cities_avg_mpg.csv', 200).then(function(data) {
    res.render('cities', { title: 'Cities', mpg_per_city: data});
  });
});

module.exports = router;
