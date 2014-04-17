/**
 * Created by xerxes on 4/17/14.
 */
(function () {
    var express, app, router, io, express_server;
    express = require('express');
    app = express();
    express_server = require('http').createServer(app);
    io = require('socket.io').listen(express_server);

    router = express.Router();
    app.set('port', process.env.PORT || 3000);

    app.use(express.static(__dirname + '/app/controllers'));


    express_server.listen(app.get('port'), function () {
        console.log('server is running at port ', app.get('port'));
    });


    router.get('/', function (request, response) {
        return response.sendfile(__dirname + '/app/views/index.html');
    });
}());