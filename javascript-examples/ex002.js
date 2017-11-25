(function () {
    'use strict';

    var numbers = [1, 4, 6, 64, 2];

    function forEach(arr, callback) {
        for (var index = 0; index < arr.length; index++) {
            callback(arr[index], index);
        }
    }

    function filter(arr, predicate) {
        var result = [];

        forEach(arr, function (value) {
            if (predicate(value)) {
                result.push(value);
            }
        });
        return result;
    }

    function isEven(value) {
        return value % 2 === 0;
    }

    function print(number) {
        console.log(number);
    }

    print(filter(numbers, isEven));
})();