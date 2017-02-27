angular
    .module('gncloud')
    .controller('guestServiceDetailCtrl', function ($scope, $http, $routeParams, $sce, $timeout,notification, $rootScope) {

        $scope.modify_data = {};

        $http({
            method: 'GET',
            url: '/api/manager/vm/machines/'+$routeParams.id,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .success(function (data, status, headers, config) {
                if (data.status == true) {
                    $scope.vm_data = data.info.vm_info;
                    $scope.tag_list = data.info.vm_info.tag.split(",");
                    $scope.disk_data = data.info.disk_info;
                    $scope.mem_data = data.info.mem_info;
                    $scope.name_data = data.info.name_info;
                    if($scope.vm_data.type != 'docker'){
                        $scope.image_data = data.info.image_info;
                    }else{
                        $scope.c_name = data.info.container_name
                        $scope.host_info = data.info.host_info
                        $scope.image_data = data.info.image_info;
                        $scope.image_data.name = data.info.image_info.view_name;
                        $scope.Log = data.info.vol_info.log_vol;
                        $scope.Data = data.info.vol_info.data_vol;
                    }
                    if($scope.vm_data.backup_confirm == 'false')
                        $scope.vm_data.backup_confirm=0;
                    $scope.nodelist($scope.vm_data.id);
                }
                else {
                    notification.sendMessage("error",data.message);
                }
            })
            .error(function (data, status, headers, config) {
                console.log(status);
            });
        $scope.nodelist=function (vm_id) {
            $scope.data={};
            $scope.data.vm_id = vm_id;
            $http({
                method: 'GET',
                url: '/api/docker/vm/logfilelist',
                params:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).success(function (data, status, headers, config) {
                if(data.status == true){
                    $scope.host_list = data.list;
                    console.log($scope.log_list);
                }

            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
        $scope.node_info=function (vm_id, filename, worker_name, filesize) {
            $scope.data={};
            $scope.content="";
            $scope.data.vm_id = vm_id;
            $scope.data.filename = filename;
            $scope.data.worker_name = worker_name;
            $scope.data.filesize = filesize
            $http({
                method: 'GET',
                url: '/api/docker/vm/logfilecontents',
                params:$scope.data,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).success(function (data, status, headers, config) {
                if(data.status == true){
                    $scope.content = data.list;
                }
            }).error(function (data, status, headers, config) {
                console.log(status);
            });
        }
        $scope.change_name = function() {
            if($("#vm_name").val() == "") {
                notification.sendMessage("warning","이름을 입력해주세요");
                return false;
            }
            $http({
                method: 'PUT',
                url: '/api/manager/vm/machines/' + $scope.vm_data.id +'/name',
                data: '{"value":"'+$("#vm_name").val()+'"}',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        notification.sendMessage("success","이름이 수정되었습니다");
                        $scope.vm_data.name = $("#vm_name").val();
                    }
                    else {
                        if(data.message != null) {
                            notification.sendMessage("error",data.message);
                        }
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }

        $scope.change_tag = function() {
            if($("#vm_tag").val() == "") {
                notification.sendMessage("warning","태그를 입력해주세요");
                return false;
            }
            $http({
                method: 'PUT',
                url: '/api/manager/vm/machines/' + $scope.vm_data.id +'/tag',
                data: '{"value":"'+$("#vm_tag").val()+'"}',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        notification.sendMessage("success","태그가 수정되었습니다");
                        $scope.tag_list = $("#vm_tag").val().split(",");
                    }
                    else {
                        if(data.message != null) {
                            notification.sendMessage("error",data.message);
                        }
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }

        $scope.statusUpdate = function() {
            $scope.vm_data.status = "Deleting"
            $http({
                method  : 'PUT',
                url: '/api/manager/vm/machine',
                data: $scope.vm_data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .success(function(data) {
                    if (data.status == true) {
                        $scope.deleteInstance();
                    }else if(data.status == false){
                        window.location.href='#/guestServiceList'
                    } else {
                        if(data.value != null) {
                            notification.sendMessage("error",data.value);
                        }
                    }
                });
        }
        $scope.backupchange=function (data) {
            $scope.data = {};
            $scope.data.backup = data;
            $http({
                method: 'PUT',
                url:'/api/manager/vm/backup/'+$routeParams.id,
                data:'{"backup":"'+data+'"}',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {

                    }
                    else {

                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }

        $scope.deleteInstance = function(){
            $timeout(function () {
                window.location.href = '#/guestServiceList';
            }, 1000 , true );

            $http({
                method: 'DELETE',
                url: '/api/'+$scope.vm_data.type+'/vm/machines/' + $scope.vm_data.id,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            })
                .success(function (data, status, headers, config) {
                    if (data.status == true) {
                        notification.sendMessage("success",$scope.vm_data.name+" 서비스가 삭제되었습니다.");
                    }
                    else {

                    }
                })
                .error(function (data, status, headers, config) {
                    console.log(status);
                });
        }

        $scope.getParameter = function (param) {
            var returnValue;
            var url = location.href;
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
            for (var i = 0; i < parameters.length; i++) {
                var varName = parameters[i].split('=')[0];
                if (varName.toUpperCase() == param.toUpperCase()) {
                    returnValue = parameters[i].split('=')[1];
                    return decodeURIComponent(returnValue);
                }
            }
        };

        $scope.getChartJs = function () {
            var data_info = null;
            $.ajax({
                type: "GET",
                url: '/api/manager/vm/machines/'+ $scope.getParameter('id')+'/graph',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                async:false,
                success: function (data) {
                    data_info = data.info;
                    new Chart(document.getElementById("line_chart").getContext("2d"), $scope.getConfig(data_info));
                }
            })
        }
        $scope.close=function () {
            $("#vm_name").val($scope.vm_data.name);
            $("#vm_tag").val($scope.vm_data.tag);
        }
        $scope.getConfig = function (data_info) {
            config = {
                type: 'line',
                data: {
                    labels: data_info.x_info,
                    datasets: [{
                        label: "Value",
                        data: data_info.cpu_per_info,
                        borderColor: 'rgba(233, 30, 99, 0.75)',
                        backgroundColor: 'rgba(233, 30, 99, 0.3)',
                        pointBorderColor: 'rgba(233, 30, 99, 0)',
                        pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
                        pointBorderWidth: 1,
                        lineTension:0
                    }]
                },
                options: {
                    responsive: true,
                    legend: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                max:100,
                                min:0,
                                callback: function(label) {
                                    return label+'%';
                                },
                            }

                        }]
                    }
                }

            }
            return config;
        }

        $scope.getChartJs();
        $scope.user_info = $rootScope.user_info;
        $rootScope.$on('init', function () {
            $scope.user_info = $rootScope.user_info;
        });

    });