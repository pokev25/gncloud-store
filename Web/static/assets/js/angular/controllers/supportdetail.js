angular
    .module('gncloud')
    .controller('supportdetailCtrl', function ($scope, $http, notification,$routeParams) {
        $scope.showData='nomal';
        $scope.data={};
        $scope.click=function (data) {
            $scope.showData = data;
        }
        $scope.supportinfo=function () {
            $http({
                method: 'GET',
                url: '/api/manager/supportdetail/'+$routeParams.id,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        $scope.post = data.list.post;
                        $scope.reply = data.list.reply;

                    }
                    else {
                        notification.sendMessage("error",data.message);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }
        $scope.change=function (id,text) {
            $scope.data.post_text = text
            $http({
                method: 'PUT',
                url: '/api/manager/supportdetail/'+id,
                data:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        $scope.supportinfo();
                    }
                    else {
                        notification.sendMessage("error",data.message);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }
        $scope.replycreate=function (id) {
            $http({
                method: 'POST',
                url: '/api/manager/supportdetail/reply/'+id,
                data:$scope.data,
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        $scope.supportinfo();
                        $scope.data.reply_text="";
                    }
                    else {
                        notification.sendMessage("error",data.message);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }
        $scope.supportinfo();

    });
