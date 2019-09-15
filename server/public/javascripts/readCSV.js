const csv = require('csv-parser');
const fs = require('fs');
const path= require('path');

var readCSV = function(fileName, maxDataPoints=undefined) {
  return new Promise(function(resolve, reject) {
    var data = []
    fs.createReadStream(path.resolve(__dirname, '../../public/csv/' + fileName))
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      var columns = data.reduce(function(totalcols, currentcols) {
        for (var column in currentcols) {
          totalcols[column] = [];
        }
        return totalcols;
      }, {});
      for (var r = 0; r < data.length; r++) {
        for (var column in columns) {
          if (data[r][column] != undefined) {
            columns[column].push(data[r][column]);
          } else {
            columns[column].push(null);
          }
        }
      }
      if(maxDataPoints != undefined && data.length > maxDataPoints) {
        var n = parseInt(data.length/maxDataPoints);
        for (column in columns) {
          columns[column] = columns[column].filter((_, i) => i % n == 0);
        }
      }
      resolve(columns);
    })
  });


}

module.exports = {readCSV: readCSV};
