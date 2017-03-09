angular
    .module('gncloud')
    .controller('joinVerifyCtrl', function ($scope, $http, $routeParams) {
        $scope.email_test={};
        $scope.email_test.email=$routeParams.email;

    });
