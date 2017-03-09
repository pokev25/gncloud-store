angular
    .module('gncloud')
    .controller('supportlistCtrl', function ($scope, $http, notification) {
        $scope.data = {}
        $scope.supportlist=function (page) {
            $scope.data.page = page;
            $http({
                method: 'GET',
                url: '/api/manager/supportlist',
                params:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        for(var i=0;i < data.list.support_count.length; i++){
                            data.list.list[i].recount = data.list.support_count[i];
                        }
                        $scope.list = data.list.list;
                        $scope.reply = data.list.support_count;
                        $scope.total = data.list.total_page;
                        $scope.total_page=data.list.total_page - (page-1)*10;
                        $scope.page_hist =data.list.page+1;
                        $scope.page_total =data.list.total+1;
                        $scope.prev_page = page - 1;
                        $scope.next_page = page + 1;
                        $scope.page = Math.ceil(data.list.total_page / 10) +1;
                        console.log($scope.page);
                        console.log($scope.next_page);
                    }else {
                        if (data.message != null) {
                            notification.sendMessage("error",data.message);
                        }
                    }

                })
        }
        $scope.supportlist(1);
    });
