(function () {
    'use strict';

    // closure

    function test(val) {
        return function () {
            console.log(++val);
        };
    }

    var test1 = test(0);
    test1();
    test1();
    test1();

    var test2 = test(0);
    test2();
    test2();
    test1();

    // immediately invoked function expression

    var lib = (function (moduleName) {
        var privateVariable = 'someValue';

        function privateFunction() {
        }

        // initialization
        console.log(moduleName);

        return {
            publicFunction : privateFunction
        };
    })('module');

    lib.publicFunction();
})();
