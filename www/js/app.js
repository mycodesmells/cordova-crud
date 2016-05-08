var app = angular.module('crud', ['database']);

app.controller('MenuController', function ($scope, Database) {

    Database.getCount(function (err, count) {
        $scope.$apply(function () {
            if (err) {
                return;
            }
            $scope.count = count;
        });
    });

    $scope.refresh = function () {
        Database.getCount(function (err, count) {
            $scope.$apply(function () {
                if (err) {
                    return;
                }
                $scope.count = count;
            });
        });
    };

    $scope.exit = function () {
        if (navigator.app) {
            navigator.app.exitApp();
        } else {
            window.close();
        }
    };

});