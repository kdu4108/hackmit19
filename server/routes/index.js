var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  var names = ['Aggressive Driving', 'Commute', 'Driving', 'Highway Speeding', 'Idling', 'Local with GPS', 'Riding Brakes', 'Tailgating'];
  var fileNames = ['aggressive-driving', 'commute', 'driving', 'highway-speeding', 'idling', 'localwithgps', 'riding-brakes', 'tailgating'];
  var filePromises = fileNames.map(function(fileName) {
    return readCSV.readCSV('behaviors/' + fileName + '.csv', 200);
  });

  Promise.all(filePromises).then(function(csvDatas) {
    res.render('index', {title: 'expression', names: names, csvDatas: csvDatas });
  })


  // readCSV.readCSV('time_v_speed.csv', 200).then(function(data) {
  //   res.render('index', { title: 'Express', timeVsSpeed: data});
  // });
});

module.exports = router;
