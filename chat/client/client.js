var CHAT = (function () {
    var socket = io.connect('http://localhost:4000/chat');

    function sendMessage(text) {
        socket.emit('client-message', text);
    }

    function addMessageHandler(handler) {
        socket.on('server-message', handler);
    }

    function addDisconnectHandler(handler) {
        socket.on('disconnect', function(userName) {
            handler(userName);
        });
    }

    function addBadCredentialsHandler(handler) {
        socket.on('bad-credentials', handler);
    }

    function addNewUserHandler(handler) {
        socket.on('new-user', handler);
    }

    function login(login, password) {
        socket.emit('login', {
            login: login,
            password: password
        });
    }

    return {
        send: sendMessage,
        addMessageListener: addMessageHandler,
        addDisconnectHandler: addDisconnectHandler,
        addBadCredentialsHandler: addBadCredentialsHandler,
        addNewUserHandler: addNewUserHandler,
        login: login
    }
})();