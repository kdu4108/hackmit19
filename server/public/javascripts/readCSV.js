const csv = require('csv-parser');
const fs = require('fs');
const path= require('path');

var readCSV = function(fileName) {
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
      resolve(columns);
    })
  });


}

module.exports = {readCSV: readCSV};
