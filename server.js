var http = require('http');

var server = http.createServer(function (req, res) {  
});

server.listen(5000); 
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
fs.createReadStream('./products_export_1.csv')
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', () => {
    console.log(results);
    //create new json file and store it
});