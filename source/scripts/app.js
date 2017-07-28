var app = angular.module("app", []);

app.controller("MainCtrl", ["$scope", "socket", "$interval", function ($scope, socket, $interval) {
    angular.element('body').css('display', 'block');
    socket.on('login', function (user) {
        if (user.steamid !== undefined) {
            $scope.user = user;
        }
    });
    var stop;
    socket.on('codes', function (codes) {
        $scope.accounts = codes;
        $scope.width = 95;
        $interval.cancel(stop);
        stop = $interval(function () {
            $scope.width -= 5;
        }, 1500);
    });
}]);

app.factory("socket", ["$rootScope", function ($rootScope) {
    var socket = io('localhost:3005');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (event, data) {
            socket.emit(event, data);
        }
    };
}]);
