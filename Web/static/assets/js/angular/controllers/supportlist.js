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
                            data.list.list[i].count = data.list.support_count[i];
                        }
                        $scope.list = data.list.list;
                        $scope.reply = data.list.support_count;
                        $scope.total_page=data.list.total_page;
                        $scope.page_hist =data.list.page+1;
                        $scope.page_total =data.list.total+1;
                        $scope.prev_page = page - 1;
                        $scope.next_page = page + 1;
                        $scope.this_page = data.list.page*10;

                    }else {
                        if (data.message != null) {
                            notification.sendMessage("error",data.message);
                        }
                    }

                })
        }
        $scope.supportlist(1);
    });
