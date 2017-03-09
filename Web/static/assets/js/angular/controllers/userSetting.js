angular
    .module('gncloud')
    .controller('userSettingCtrl', function ($scope, $http ,notification) {
        $scope.data={};
        $scope.user=function () {
            $http({
                method: 'GET',
                url: '/api/manager/user',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        $scope.info_user = data.list;
                        $("#user_name").val(data.list.user_name);
                        $("#tel").val(data.list.tel);
                        $("#email").val(data.list.email);
                    }

                })

        }
        $scope.user();
        $scope.userchange=function () {
            $http({
                method: 'POST',
                url: '/api/manager/user',
                data:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        window.location.reload();
                    }

                })
        }
    });