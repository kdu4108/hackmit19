var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js')


var capitalize = function(word) {
  return word[0].toUpperCase() + word.substring(1, word.length).toLowerCase();
}

var formatName = function(underscoredName) {
  parts = underscoredName.split('_');
  return parts.map((p)=>capitalize(p)).join(' ');
}

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

router.get('/cities', function(req, res, next) {
  res.render('cities', {title: 'Cities'});
})

router.get('/cities/:cityName/:subCityName', function(req, res, next) {
  var cityName = formatName(req.params.cityName);
  var subCityName = formatName(req.params.subCityName);
  res.render('subcity', { title: cityName + ' ' + subCityName, city: cityName, subcity: subCityName, speedMPGData: {} });
})

module.exports = router;
