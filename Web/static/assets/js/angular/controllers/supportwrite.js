angular
    .module('gncloud')
    .controller('supportwriteCtrl', function ($scope, $http ,notification) {
        $scope.data={};
        $("#error").hide();
        $scope.write=function () {
            $http({
                method: 'POST',
                url: '/api/manager/supportwrite',
                data:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.message == 'success') {
                        window.location.href='#/supportlist'
                        notification.sendMessage('success',"등록되었습니다.")
                    }else if (data.status == false){
                        $("#error").show();
                    }else if (data.message == 'login'){
                        alert("로그인이 필요 합니다. 로그인을 해주세요.")
                    }

                })
        }
    });