angular
    .module('gncloud')
    .controller('supportMainCtrl', function ($scope, $http) {
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
    });
