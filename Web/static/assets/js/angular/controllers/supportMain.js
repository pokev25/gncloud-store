angular
    .module('gncloud')
    .controller('supportMainCtrl', function ($scope, $http) {
        $("#search").hide();
        $http({
            method: 'GET',
            url: '/api/manager/supportmain',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .success(function (data, status, headers, config) {
                if (data.status == true) {

                    $scope.famous = data.list.famous;
                    $scope.latest = data.list.latest;
                    for(var i=0;i < data.list.reply.length; i++){
                        data.list.latest[i].recount = data.list.reply[i];
                    }

                }else if (data.status == false){

                }

            })
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
                        $("#search").show();
                        $("#famous").hide();
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
                    }else {
                        if (data.message != null) {
                            notification.sendMessage("error",data.message);
                        }
                    }

                })
        }
    });
