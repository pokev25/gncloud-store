angular
    .module('gncloud')
    .controller('joinFormCtrl', function ($scope, $http, $routeParams) {
            $scope.data = {};
            $scope.signup=function () {
                $scope.data.token = $routeParams.token;
                $http({
                    method: 'POST',
                    url: '/api/manager/join',
                    data:$scope.data,
                    headers: {'Content-Type': 'application/json; charset=utf-8'}
                })
                    .success(function (data, status, headers, config) {
                        if (data.status == true) {
                            window.location = "#/joincomplete?user="+$scope.data.user_name;
                            notification.sendMessage("success",data.message);

                        }
                        else if(data.status=='false') {
                            notification.sendMessage("error",data.message);
                            alert("false");
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log(status);
                    });
            }
    });
