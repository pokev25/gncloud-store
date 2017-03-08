angular
    .module('gncloud')
    .controller('checkUrlCtrl', function ($scope, $http, $routeParams,notification) {

        $http({
            method: 'GET',
            url: '/api/manager/checkurl/'+$routeParams.url,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .success(function (data, status, headers, config) {
                if (data.che == 'ok') {
                    window.location = "#/joinform?token="+$routeParams.url;
                    notification.sendMessage("success",data.message);

                }
                else if(data.che=='false') {
                    notification.sendMessage("error",data.message);
                    alert("false");
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });

    });
