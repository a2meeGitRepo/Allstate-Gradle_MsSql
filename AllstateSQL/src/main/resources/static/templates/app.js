angular.module('myApp', [
	'ui.router',
	'LocalStorageModule',
	'angularUtils.directives.dirPagination',
	'ui.bootstrap',
	'ngJsonExportExcel',
	'toastr',
	'chart.js',
	'ja.qr',
	'ngCookies',
	'ui.tinymce',
	'ngRoute',
	'myApp.barcode',
	'myApp.main',
	'myApp.home',
	'myApp.login',
	'myApp.generic',
	'myApp.user',
	'myApp.asset',
	'myApp.employee',
	'myApp.tagUpload',
	'myApp.assetEmployeeMapped',
	'myApp.assetInfo',
	'myApp.mailManger',
	'myApp.device',
	'myApp.notification',
	'myApp.assetTagMapping',
	'myApp.allocationReport',

,
])

.value('_', window._)

.constant('ApiEndpoint', {
	//url: 'http://allstate.cloudjiffy.net/',
	//url: 'http://10.193.16.58:8081/',
	
	
	/*url: 'http://localhost:8081/',
	rFIDurl: 'http://localhost:8081/',
	bleURL: 'http://localhost:8083/',*/
	
	/*url: 'http://10.193.16.58:8080/',
	rFIDurl: 'http://10.193.16.58:8081/',
	bleURL: 'http://10.193.16.58:8083/',
	*/
	
	
	
	
	/*url: 'http://adp.ind.in:8081/',
	rFIDurl: 'http://adp.ind.in:8084/',
	bleURL: 'http://adp.ind.in:8083/',*/
	url: 'http://localhost:8080/',
	
userKey : 'allState'
})
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }else if($location.path() == '/login' && $rootScope.globals.currentUser){
            	$location.path('/main/home');
            }
        });
    }])

.config(function($urlRouterProvider,$locationProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/main/home');
	 // use the HTML5 History API
	
	 $locationProvider.hashPrefix('');
}); 