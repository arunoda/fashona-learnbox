var doubled = require('./doubled');
var events = require('events');


exports['calculate'] = function (test) {
    test.equal(doubled.calculate(2), 4);
    test.equal(doubled.calculate(5), 10);
    test.throws(function () { doubled.calculate(); });
    test.throws(function () { doubled.calculate(null); });
    test.throws(function () { doubled.calculate(true); });
    test.throws(function () { doubled.calculate([]); });
    test.throws(function () { doubled.calculate({}); });
    test.throws(function () { doubled.calculate('asdf'); });
    test.throws(function () { doubled.calculate('123'); });
    test.done();
};

/*  
exports['read a value other than a number'] = function (test) {
    test.expect(1);
    var ev = new events.EventEmitter();

    var _openStdin = process.openStdin;
    process.openStdin = function () { return ev; };

    var _exit = process.exit;
    process.exit = test.done;

    var _calculate = doubled.calculate;
    doubled.calculate = function () {
        throw new Error('Expected a number');
    };


    var _log = console.log;
    console.log = function (str) {
        test.equal(str, 'Error: Expected a number');
    };

    doubled.read();
    ev.emit('data', 'asdf');
}; */

exports['read a number'] = function (test) {
    test.expect(1);
    var ev = new events.EventEmitter();

    var _openStdin = process.openStdin;
    process.openStdin = function () { return ev; };

    var _exit = process.exit;
    process.exit = test.done;

    var _log = console.log;
    console.log = function (str) {
        test.equal(str, 'doubled: 24');
    };

    doubled.read();
    ev.emit('data', '12');
};


