angular
    .module('gncloud')
    .controller('joinEmailCtrl', function ($scope, $http, notification) {
        $scope.emailcheck=function () {
            $http({
                method: 'POST',
                url: '/api/manager/vm/emailcheck',
                data:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        window.location = "#/joinverify?email="+$scope.data.email
                        notification.sendMessage("success",data.message);

                    }
                    else {
                        notification.sendMessage("error",data.message);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }
    });
