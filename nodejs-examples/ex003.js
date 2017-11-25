var fs = require('fs');

fs.stat('ex001.js', function (error, stats) {
    if (error) {console.log(error.message); return;}

    console.log(stats);
});

fs.open('ex001.js', 'r', function (error, fd) {
    if (error) throw error;

    var  readBuffer = new Buffer(1024),
        bufferOffset = 0,
        bufferLength = readBuffer.length,
        filePosition = 0;

    fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition, function (error, readBytes) {
        if (error) throw error;

        console.log('Read ' + readBytes  + ' bytes');
        if (readBytes > 0) {
            console.log(readBuffer.slice(0, readBytes));
        }
    })

});