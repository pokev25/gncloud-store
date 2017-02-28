var serviceConfig = function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/store', {templateUrl: '/store.html', controller: 'storeCtrl'})
        .when('/guestQna', {templateUrl: '/guestQna.html', controller: 'guestQnaCtrl'})
    $httpProvider.interceptors.push('serviceLogger');
}

// 서비스 페이지 설정
angular
    .module('gncloud')
    .config(serviceConfig);
