var serviceAddModules = [
    'ngRoute'
    ,'ngFileUpload'
    ,'uiSwitch'
    ,'angularNotify'
];

(function () {

    var app = angular.module('gncloud', serviceAddModules);
    app.run(function($rootScope,$http){
        $http({
            method: 'GET',
            url: '/api/manager/vm/logincheck',
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .success(function (data, status, headers, config) {
                $rootScope.user_info = data.info;
                $rootScope.$emit('init');
            })
            .error(function (data, status, headers, config) {
                console.log("checking success!!");
            });


    });

    app.factory('serviceLogger', function ($location) {
        return {
            responseError: function(response) {
                if(response.status == 401){
                    window.location ="/"
                }
                return response;
            },
        };
    });
    app.filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        }
        });
    app.service('dateModifyService', function()
    {
        this.modifyDate = function(date)
        {
            var data_year = date.substring(0,4);
            var data_month = date.substring(5,7);
            var data_day = date.substring(8,10);
            var data_time = date.substring(11,13);
            var data_mins= date.substring(14,16);
            var date = new Date();
            var year  = date.getFullYear();
            var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
            var day   = date.getDate();
            var time   = date.getHours();
            var min = date.getMinutes();
            var dateDiff = "";
            if(data_year != year && month == data_month){
                dateDiff = (year-data_year)+"년 전";
            }else if(data_month != month){
                if(month-data_month>0){
                    dateDiff = (month-data_month)+"개월 전";
                }else{
                    dateDiff = (12-data_month)+month+"개월 전";
                    console.log(dateDiff);
                }

            }else if(data_day != day){
                dateDiff = (day-data_day)+"일 전";
            }else if(data_time != time){
                dateDiff = (time-data_time)+"시간 전";
            }else if(data_mins != min){
                dateDiff = (min-data_mins) +"분 전";
            }else{
                dateDiff = "1분 전";
            }
            return dateDiff
        };
    });

    app.service('notification', function($rootScope){
        this.sendMessage = function(data_type, data_title, data_contetnt) {
            var notify = {
                type: data_type,
                title: data_title,
                content: data_contetnt
            };
            $rootScope.$emit('notify', notify);
        }
    });

})();






