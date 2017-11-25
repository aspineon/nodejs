(function () {
    'use strict';

    // oop

    var user = {
        firstName: 'Jan',
        lastName: 'Kowalski',
        printInfo: function () {
            console.log(this.firstName + ' ' + this.lastName);
        }
    };

    user.printInfo();
    delete user.printInfo;

    function Account(number) {
        var balanceInfo = 'Balance: ';

        if (!(this instanceof Account)) {
            return new Account(number);
        }

        this.number = number;
        this.balance = 0;
        this.printBalance = function () {
            console.log(balanceInfo + this.balance);
        };

        this.firstName = 'sdfsdfd';

        return this;
    }

    Account.prototype.deposit = function (funds) {
        this.balance = funds;
    };

    var account1 = new Account('00000000000000000000000001');
    account1.printBalance();
    account1.deposit(1000);

    function PremiumAccount() {

    }

    PremiumAccount.prototype = new Account();
})();


// call // apply

var color = 'yellow',
    production = {
        color: 'red'
    },
    development = {
        color: 'blue'
    };

function printColor(defaultColor) {
    console.log(this.color);
}

printColor();
printColor.apply(production, ['orange']);
printColor.call(development, 'orange');