var serviceConfig = function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/guestList', {templateUrl: '/main/guestList.html', controller: 'guestListCtrl'})
        .when('/guestCreate', {templateUrl: '/main/guestCreate.html', controller: 'guestCreateCtrl'})
        .when('/guestSnapList', {templateUrl: '/main/guestSnapList.html', controller: 'guestSnapListCtrl'})
        .when('/monitor', {templateUrl: '/main/guestRunList.html', controller: 'guestRunListCtrl'})
        .when('/guestLogout', {templateUrl: '/main/index.html', controller: 'guestLogoutCtrl'})
        .when('/account/users/list', {templateUrl: '/main/guestMeList.html', controller: 'guestMeListCtrl'})
        .when('/dashboard', {templateUrl: '/main/dashboard.html', controller: 'dashboardCtrl'})
        .when('/guestDetail', {templateUrl: '/main/guestDetail.html', controller: 'guestDetailCtrl'})
        .when('/guestSelectTeam', {templateUrl: '/main/guestSelectTeam.html', controller: 'guestSelectTeamCtrl'})
        .when('/guestReadyTeam', {templateUrl: '/main/guestReadyTeam.html', controller: 'guestReadyTeamCtrl'})
        .when('/guestCreateTeam', {templateUrl: '/main/guestCreateTeam.html', controller: 'guestCreateTeamCtrl'})
        .when('/guestSystemList', {templateUrl: '/main/guestSystemList.html', controller: 'guestSystemListCtrl'})
        .when('/guestTeamDetail', {templateUrl: '/main/guestTeamDetail.html', controller: 'guestTeamDetailCtrl'})
        .when('/guestTeamList', {templateUrl: '/main/guestTeamList.html', controller: 'guestTeamListCtrl'})
        .when('/guestCluster', {templateUrl: '/main/guestCluster.html', controller: 'guestClusterCtrl'})
        .when('/guestImage', {templateUrl: '/main/guestImage.html', controller: 'guestImageCtrl'})
        .when('/guestPrice', {templateUrl: '/main/guestPrice.html', controller: 'guestPriceCtrl'})
        .when('/guestLoginHist', {templateUrl: '/main/guestLoginHist.html', controller: 'guestLoginHistCtrl'})
        .when('/guestUseHist', {templateUrl: '/main/guestUseHist.html', controller: 'guestUseHistCtrl'})
        .when('/guestBackupHist', {templateUrl: '/main/guestBackupHist.html', controller: 'guestBackupHistCtrl'})
        .when('/guestProblemHist', {templateUrl: '/main/guestProblemHist.html', controller: 'guestProblemHistCtrl'})
        .when('/guestSetting', {templateUrl: '/main/guestSetting.html', controller: 'guestSettingCtrl'})
        .when('/guestNotice', {templateUrl: '/main/guestNotice.html', controller: 'guestNoticeCtrl'})
        .when('/guestQna', {templateUrl: '/main/guestQna.html', controller: 'guestQnaCtrl'})
        .when('/guestInvoice', {templateUrl: '/main/guestInvoice.html', controller: 'guestInvoiceCtrl'})
        .when('/guestBackupHist', {templateUrl: '/main/guestBackupHist.html', controller: 'guestBackupHistCtrl'})
        .when('/guestTeamKey', {templateUrl: '/main/guestTeamKey.html', controller: 'guestTeamKeyCtrl'})
        .when('/guestTeamProfile', {templateUrl: '/main/guestTeamProfile.html', controller: 'guestTeamProfileCtrl'})
        .when('/guestTeamReso', {templateUrl: '/main/guestTeamReso.html', controller: 'guestTeamResoCtrl'})
        .when('/guestTeamWon', {templateUrl: '/main/guestTeamWon.html', controller: 'guestTeamWonCtrl'})
        .when('/guestTeamBackup', {templateUrl: '/main/guestTeamBackup.html', controller: 'guestTeamBackupCtrl'})
        .when('/guestServiceList', {templateUrl: '/main/guestServiceList.html', controller: 'guestServiceListCtrl'})
        .when('/guestServiceCreate', {templateUrl: '/main/guestServiceCreate.html', controller: 'guestServiceCreateCtrl'})
        .when('/guestServiceDetail', {templateUrl: '/main/guestServiceDetail.html', controller: 'guestServiceDetailCtrl'})
    $httpProvider.interceptors.push('serviceLogger');
}

// 서비스 페이지 설정
angular
    .module('gncloud')
    .config(serviceConfig);
