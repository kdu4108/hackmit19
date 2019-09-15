var express = require('express');
var router = express.Router();
const readCSV = require('./../public/javascripts/readCSV.js');
const fs = require('fs');
const path = require('path');

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

router.get('/cities/:cityName', function(req, res, next) {
  var cityName = formatName(req.params.cityName);
  var cityRoute = req.params.cityName;
  var cityMap = {
    'New York City': 'nyc',
    'Delhi': 'delhi',
    'Taiwan': 'taiwan'
  };
  var subCityMap = {
    'New York City': (n) => n.replace('-', '_').replace('.csv', ''),
    'Taiwan': (n) => n.replace('-can.csv', '').match(/[A-z0-9][a-z]*/g).join('_'),
    'Delhi': (n) => n.replace('.csv', '')
  };

  var files = fs.readdirSync(path.resolve(__dirname, '../public/csv/cities/' + cityMap[cityName] + '/'));
  var subCities = files.map(function(f) {
    return {
      route: subCityMap[cityName](f),
      name: formatName(subCityMap[cityName](f))
    }
  })

  res.render('city', {title: cityName, name: cityName, cityRoute: cityRoute, subCities: subCities});

})

router.get('/cities/:cityName/:subCityName', function(req, res, next) {
  var cityName = formatName(req.params.cityName);
  var subCityName = formatName(req.params.subCityName);
  var cityMap = {
    'New York City': 'nyc',
    'Delhi': 'delhi',
    'Taiwan': 'taiwan'
  };
  var subCityMap = {
    'New York City': (n) => n.replace('_', '-') + '.csv',
    'Taiwan': (n) => n.split('_').join('') + '-can.csv',
    'Delhi': (n) => n + '.csv'
  };
  var fileName = '/cities/' + cityMap[cityName] + '/' + subCityMap[cityName](req.params.subCityName);
  readCSV.readCSV(fileName, 200).then(function(speedMPGData) {
    res.render('subcity', { title: cityName + ' ' + subCityName, city: cityName, subcity: subCityName, speedMPGData: speedMPGData });
  }).catch(function(err) {
    res.render('error', {message: err, error: {status: '', stack: ''}});
  })
})

module.exports = router;
