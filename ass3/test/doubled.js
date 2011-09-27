var events = require('events');

exports.calculate = function (num) {
    if (typeof num === 'number') {
         return num * 2;
    }
    else {
        throw new Error('Expected a number');
    }
};


exports.read = function () {
    var stdin = process.openStdin();

    stdin.on('data', function (chunk) {
        var num = parseFloat(chunk);
        
        try {
            var result = exports.calculate(num);
            console.log('doubled: ' + result);
        }
        catch (e) {
            console.log(e);
        }

        process.exit();
    });
};