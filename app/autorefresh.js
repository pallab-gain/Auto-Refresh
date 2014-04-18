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

var app = angular.module('AutoRefresh', []);

app.controller('RefreshCtrl', function ($scope) {
    $scope.socket = io.connect('')
});
