var serviceConfig = function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/store', {templateUrl: '/store.html', controller: 'storeCtrl'})
        .when('/guestQna', {templateUrl: '/guestQna.html', controller: 'guestQnaCtrl'})
        .when('/supportlist', {templateUrl: '/supportlist.html', controller: 'supportlistCtrl'})
        .when('/supportdetail', {templateUrl: '/supportdetail.html', controller: 'supportdetailCtrl'})
        .when('/supportwrite', {templateUrl: '/supportwrite.html', controller: 'supportwriteCtrl'})
        .when('/supportmain', {templateUrl: '/supportMain.html', controller: 'supportMainCtrl'})
        .when('/joinemail', {templateUrl: '/joinEmail.html', controller: 'joinEmailCtrl'})
        .when('/joinverify', {templateUrl: '/joinVerify.html', controller: 'joinVerifyCtrl'})
        .when('/checkurl', {templateUrl: '/checkUrl.html', controller: 'checkUrlCtrl'})
        .when('/joinform', {templateUrl: '/joinForm.html', controller: 'joinFormCtrl'})
        .when('/joincomplete', {templateUrl: '/joincomplete.html', controller: 'joincompleteCtrl'})
        .when('/usersetting', {templateUrl: '/userSetting.html', controller: 'userSettingCtrl'})
    $httpProvider.interceptors.push('serviceLogger');
}

// 서비스 페이지 설정
angular
    .module('gncloud')
    .config(serviceConfig);
