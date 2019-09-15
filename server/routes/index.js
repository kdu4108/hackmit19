var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js')

/* GET home page. */
router.get('/', function(req, res, next) {
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

module.exports = router;
