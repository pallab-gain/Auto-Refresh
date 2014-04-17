/**
 * Created by xerxes on 4/17/14.
 */
var state = function State() {
    var state = false;
    return {
        switch_state: function () {
            state = !state;
            return;
        },
        get_state: function () {
            return state;
        }
    }
}();

var socket = io.connect('http://localhost:3000');
chrome.browserAction.onClicked.addListener(function (tab) {
    state.switch_state();
    if (state.get_state() === true) {
        alert('join me');
        socket.emit('join');
    }
    socket.on('request', function (status) {
        socket.emit('watch_dir', {dirs: ['app']})
    });
    socket.on('request_reload', function () {
        alert('Reload me please');
    });
});