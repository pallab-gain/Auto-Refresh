/**
 * Created by xerxes on 4/17/14.
 */
(function () {
    var express, app, router, io, express_server, _, async, watchr;
    express = require('express');
    _ = require('underscore');
    async = require('async');
    watchr = require('watchr');

    app = express();
    express_server = require('http').createServer(app);
    io = require('socket.io').listen(express_server);


    router = express.Router();

    app.set('port', process.env.PORT || 3000);

    express_server.listen(app.get('port'), function () {
        console.log('server is running at port ', app.get('port'));
    });
    io.sockets.on('connection', function (socket) {
        console.log('New connection ', new Date());
        socket.on('join', function () {
            async.series([
                function (callback) {
                    socket.join(socket.id);
                    callback(null, socket.id);
                }
            ], function (err, result) {
                if (!err) {
                    io.sockets.in(result[0]).emit('request', {status: 'request file checksum'});
                }
            });

        });
        socket.on('watch_dir', function (dir_list) {
            watchr.watch({
                paths: dir_list["dirs"],
                listeners: {
                    log: function (logLevel) {
                    },
                    error: function (err) {
                    },
                    watching: function (err, watcherInstance, isWatching) {
                    },
                    change: function (changeType, filePath, fileCurrentStat, filePreviousStat) {
                        socket.emit('request_reload');
                    }
                },
                next: function (err, watchers) {
                }
            });
        });
        socket.on('disconnection', function () {
            if (socket && typeof socket.id !== 'undefined')
                socket.leave(socket.id);
        });
    });

}());