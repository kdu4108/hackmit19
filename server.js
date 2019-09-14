// server.js

var express = require('express');

var app = express();

var PORT = 3000;

app.get('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname });
});

app.get('/line_demo_1.js', function(req, res) {
    res.sendFile('line_demo_1.js', {root: __dirname });
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});
