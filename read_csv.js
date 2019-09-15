const fs = require('fs');
function read_csv(filename) {
    let inputText = fs.readFile('Input.txt', 'utf-8', (err, data) => { 
        if (err) throw err; 
    
        // Converting Raw Buffer to text 
        // data using tostring function. 
        console.log(data); 
    })
    var lines = inputText.split('\n');
    // This assumes no commas in the values names.
    function getCsvValuesFromLine(line) {
        var values = lines[0].split(',');
        value = values.map(function(value){
            return value.replace(/\"/g, '');
        });
        return values;
    }

    var headers = getCsvValuesFromLine(lines[0]);

    lines.shift(); // remove header line from array
    var people = lines.map(function(line) {
        var person = {},
            lineValues = getCsvValuesFromLine(line);
        for(var i = 0; i < lines.length; i += 1) {
            person[headers[i]] = lineValues[i];
        }
        return person;
    });

    console.log(people);
    return people;
    // return [[1,2,3,4,5], [1,2,3,4,5]];
}

module.exports = {
    read_csv: this.read_csv
}