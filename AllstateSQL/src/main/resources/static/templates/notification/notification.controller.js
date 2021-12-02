(function() {
	'use strict';

	angular.module('myApp.notification').controller('NotificationController', NotificationController);

	NotificationController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function NotificationController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var notificationUrl  = ApiEndpoint.url+"notification";
		var vm = angular.extend(this, {
			read:read,
			loadNotificationsBySearch:loadNotificationsBySearch,
			serachText:"",
		});

		(function activate() {
			
			loadNotifications()
		
		})();
			function loadNotifications(){
				
						var msg=""
						 var url =notificationUrl+"/getNotificationList";
						genericFactory.getAll(msg,url).then(function(response) {
						vm.notifications = response.data;
						console.log("notification: "+JSON.stringify(vm.notifications))
						
						
					});
			}
			function loadNotificationsBySearch(){
				
				var msg=""
				 var url =notificationUrl+"/getNotificationListBySearch?serachText="+vm.serachText;
				genericFactory.getAll(msg,url).then(function(response) {
				vm.notifications = response.data;
				console.log("notification: "+JSON.stringify(vm.notifications))
				
				
			});
	}
		function read(notification){
						notification.view_bit=1
					 var msg="Notification updated"
					 var url =notificationUrl+"/updateNotification";
					genericFactory.add(msg,url,notification).then(function(response) {
						loadNotificationCount();
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

	
	}
})();
