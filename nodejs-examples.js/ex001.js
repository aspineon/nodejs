var fs = require('fs');
var readStream = fs.createReadStream('ex001.js');

readStream.on('data', function (data) {
    console.log(data);
});

readStream.on('end', function () {
    console.log('eof');
});