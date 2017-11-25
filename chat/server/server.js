var mysql = require('mysql'),
    mysqlClient = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'chat',
        password: 'admin'
    }),
    async = require('async'),
    socketServer = require('socket.io').listen(4000),
    chat = socketServer.of('/chat');

chat.on('connection', onConnection);

function onConnection(socket) {
    socket.on('login', function (credentials) {
        login(socket, credentials);
    });
}

function onDisconnect(socket) {
    getUserName(socket, function(err, userName) {
        chat.emit('disconnect', userName);
    });
}

function onError(err) {
    console.log("####"  + err);
    throw err;
}

function onClientMessage(socket, text) {
    getUserName(socket, function(err, userName) {
        if (err) onError(err);
        socket.broadcast.emit('server-message', {
            from : userName,
            text: text
        });
    });
}

function fetchProfile(credentials, callback) {
    mysqlClient.query('select * from profiles where login = ? limit 1', [credentials.login], function(err, rows) {
        if (err) callback(err);
        callback(null, rows[0]);
    });
}

function verifyLogin(socket, credentials, profile, callback) {
    if (credentials.login === profile.login && credentials.password === profile.password) {
        socket.set('name', profile.name, function(err) {
            if (err) callback(err);
            callback(null, socket, profile);
        });
    } else {
        socket.emit('bad-credentials');
    }
}

function setUpListeners(socket, profile) {
    socket.on('client-message', function (text) {
        onClientMessage(socket, text);
    });
    socket.on('disconnect', function() {
        onDisconnect(socket);
    });
    socket.broadcast.emit('new-user', profile.name);
}

function login(socket, credentials) {
    async.waterfall([
        function(callback) {
            fetchProfile(credentials, callback);
        },
        function(profile, callback) {
            verifyLogin(socket, credentials, profile, callback);
        },
        function(socket, profile) {
            setUpListeners(socket, profile);
        }
    ]);
}

function getUserName(socket, callback) {
    socket.get('name', callback);
}
