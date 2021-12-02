(function() {
	'use strict';

	angular
		.module('myApp.login')
		.controller('loginController', loginController);

		loginController.$inject = ['$rootScope','$scope','$stateParams','$state','localStorageService','toastr', 'ApiEndpoint','loginFactory','$location','$window','genericFactory'];

	/* @ngInject */
	function loginController($rootScope, $stateParams, $scope, $state, localStorageService,toastr, ApiEndpoint, loginFactory,$location,$window,genericFactory) {
		var userUrl = ApiEndpoint.url+"user";
		var vm = angular.extend(this, {
			doLogin : doLogin

		});

		(function activate() {
					
		})();

		// ******************************************************
		
		function doLogin(user){

			var msg=""								
			var  url =userUrl+"/login"
			console.log("URL :: "+url)
			console.log("User: "+JSON.stringify(user))
			genericFactory.add(msg,url,user).then(function(response) {
				vm.user = response.data;
				
				if (vm.user.code==200) {
					
				
					loginFactory.SetCredentials(user);
					$location.path('/main/home');
					toastr.success(vm.user.massage);
					localStorageService.set(ApiEndpoint.userKey, response.data.data);
					$window.location.reload();
					//$state.go('main.home');
				} else {
					
					toastr.error(vm.user.massage);
				}
				
			});
		}

		/*function doLogin(login) {
			console.log(JSON.stringify(login));
			loginFactory.doLogin(login).then(function(response){
				console.log("Responce"+JSON.stringify(response))
				if (response.status=='200') {
					
					console.log("Success")
					loginFactory.SetCredentials(login);
					$location.path('/main/home');
					toastr.success('Login....', 'Succesful !!');
					localStorageService.set(ApiEndpoint.userKey, response.data);
					$window.location.reload();
				} else {
					console.log("EOOR")
					toastr.error('Username and Password Doesnt match...!!');
				}
				if(response.data.length != 0){
					$state.go('main.home');
					toastr.success('Login....', 'Succesful !!');
					localStorageService.set(ApiEndpoint.userKey, response.data);
				}else{
					toastr.error('Username and Password Doesnt match...!!');
				}
			});
		}*/
	}
})();
