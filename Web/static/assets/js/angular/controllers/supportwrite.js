angular
    .module('gncloud')
    .controller('supportwriteCtrl', function ($scope, $http ,notification) {
        $scope.data={}
        $scope.write=function () {
            $http({
                method: 'POST',
                url: '/api/manager/supportwrite',
                data:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        window.location.href='#/supportlist'
                        notification.sendMessage('success',"등록되었습니다.")
                    }else {
                        if (data.message != null) {
                            notification.sendMessage("error",data.message);
                        }
                    }

                })
        }
    });