(function () {
    'use strict';

    function get(id) {
        return document.querySelector(`#${id}`);
    }

    function on(target, event, callback) {
        target.addEventListener(event, callback);
    }

    function getValue(id) {
        const value = get(id).value;
        return parseFloat(isNaN(value) ? 0 : value);
    }

    function calculate() {
        const leftValue = getValue('leftSide'),
            rightValue = getValue('rightSide'),
            operator = get('operator').value,
            result = get('result');

        // eval is evil !!!!!
        try {
            result.value = eval(leftValue + operator + rightValue);
        } catch (error) {
            result.value = 'error';
        }
    }

    on(get('calculate'), 'click',  calculate);
})();