(function() {
	'use strict';

	angular.module('myApp.home').controller('HomeController', HomeController);

	HomeController.$inject = [ '$state', '$log',
			'$scope', 'toastr','localStorageService','ApiEndpoint','loginFactory','genericFactory','$interval' ];

	/* @ngInject */
	function HomeController($state, $log, $scope, toastr,localStorageService,ApiEndpoint,loginFactory,genericFactory,$interval) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var notificationUrl  = ApiEndpoint.url+"notification";
		var dashboardUrl = ApiEndpoint.url+"dasshboard";

		$scope.totalAsset=0;
		var vm = angular.extend(this, {
			
			
		});

		(function activate() {
			
			loadRegisterAssetCount()
			loadUnRegisterAssetCount()
			loadAllocatedAssetCount()
			loadUnAllocatedAssetCount()
			getAllUnSeenNotifications();
		})();
	
		  
		  

	
		function doLogout (){
			loginFactory.ClearCredentials();
			$state.go('login');
			localStorageService.remove(ApiEndpoint.userKey);
		}

	$scope.viewNotification=function(notification){
		notification.view_bit=1
		 var msg="Notification updated"
		 var url =notificationUrl+"/updateNotification";
		genericFactory.add(msg,url,notification).then(function(response) {
			getAllUnSeenNotifications();
			loadNotifications()
			
		
	});
	}
	function loadNotificationCount(){
		var msg=""
			 var url =notificationUrl+"/getNotificationCount";
			genericFactory.getAll(msg,url).then(function(response) {
				$rootScope.notificationCount = response.data;
			console.log("notification Count: "+JSON.stringify($rootScope.notificationCount))
			
			
		});
	}

	  		
		function loadRegisterAssetCount(){
			var msg=""
				 var url =dashboardUrl+"/getRegisterAssetCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.registerAssetCount = response.data;
				console.log("RegisterAssetCount: "+JSON.stringify(vm.registerAssetCount))
								
			});
		}
		function loadUnRegisterAssetCount(){
			var msg=""
				 var url =dashboardUrl+"/getUnRegisterAssetCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.unRegisterAssetCount = response.data;
				console.log("UnRegisterAssetCount: "+JSON.stringify(vm.unRegisterAssetCount))
								
			});
		}
		function loadAllocatedAssetCount(){
			var msg=""
				 var url =dashboardUrl+"/getAllocatedAssetCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.allocatedAssetCount = response.data;
				console.log("AllocatedAssetCount: "+JSON.stringify(vm.allocatedAssetCount))
								
			});
		}
		function loadUnAllocatedAssetCount(){
			var msg=""
				 var url =dashboardUrl+"/getUnAllocatedAssetCount";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.unAllocatedAssetCount = response.data;
				console.log("UnAllocatedAssetCount: "+JSON.stringify(vm.unAllocatedAssetCount))
								
			});
		}
		
		function getAllUnSeenNotifications(){
			var msg=""
				 var url =dashboardUrl+"/getAllUnSeenNotifications";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.notifications = response.data;
				console.log("notifications: "+JSON.stringify(vm.notifications))
								
			});
		}
		
	  		
	  		
	  		
	}	
})();
