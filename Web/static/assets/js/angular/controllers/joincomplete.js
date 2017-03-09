angular
    .module('gncloud')
    .controller('joincompleteCtrl', function ($scope, $http, $routeParams) {
        $scope.user_name = $routeParams.user;
    });
