angular
    .module('gncloud')
    .controller('supportdetailCtrl', function ($scope, $http, notification,$routeParams,$rootScope) {
        $scope.showData='nomal';
        $scope.replyData='nomal';
        $scope.data={};
        $scope.click=function (data) {
            $scope.showData = data;
        }
        $scope.reply_data=function (data) {
            $scope.replyData = data;
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
                data:$scope.data
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
        $scope.reply_del=function (id) {
            var returnvalue = confirm("댓글을 삭제하시겠습니까 ?")
            if(returnvalue){
            $http({
                    method: 'DELETE',
                    url: '/api/manager/supportdetail/'+id,
                })
                    .success(function (data, status, headers, config) {
                        if (data.status == true) {
                            notification.sendMessage("success","댓글이 삭제되었습니다.");
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
        }
        $scope.del=function (id) {
            var returnvalue = confirm("글을 삭제하시겠습니까 ?")
            if(returnvalue){
                $http({
                    method: 'DELETE',
                    url: '/api/manager/supportdetail/'+id,
                })
                    .success(function (data, status, headers, config) {
                        if (data.status == true) {
                            window.location.href = '#/supportlist'
                            notification.sendMessage("success","글이 삭제되었습니다.");
                        }
                        else {
                            notification.sendMessage("error",data.message);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log(status);
                    });
            }
        }

        $scope.supportinfo();
        $scope.user_info = $rootScope.user_info;
        $rootScope.$on('init', function () {
            $scope.user_info = $rootScope.user_info;
        });
    });
