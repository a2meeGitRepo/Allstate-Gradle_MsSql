(function() {
	'use strict';

	angular.module('myApp.zone').controller('ZoneController', ZoneController);

	ZoneController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function ZoneController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var zonedeviceUrl = ApiEndpoint.url+"zonedevice";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			add:add,
			save:save,
			cancle:cancle,
			changeStatus:changeStatus,
			edit:edit,
			delet:delet,
		});

		(function activate() {
			loadZones();
			
		})();
		function loadZones() {
		     var msg=""
			 var url =zonedeviceUrl+"/getAllZones";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.zones = response.data;
			console.log("zones: "+JSON.stringify(vm.zones))
			
			
		});
	}
		function edit(zone){
			$scope.addNew=true;
			$scope.zone=zone;
		}
		function add(){
			$scope.addNew=true;
			$scope.zone={};
			
		}

		function cancle(){
			
			$scope.addNew=false;
		
		}
		function changeStatus(zone){
			var msg=""
				 var url =zonedeviceUrl+"/updateZoneStatus";
				genericFactory.add(msg,url,zone).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
				}else{
					toastr.error(response.data.message);

				}
				loadZones();
				
			});
		}
		function delet(zone){
			var msg=""
				 var url =zonedeviceUrl+"/deletZone";
				genericFactory.add(msg,url,zone).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
				}else{
					toastr.error(response.data.message);

				}
				loadZones();
				
			});
		}
		function save(zone){
				
			if(zone==undefined||zone.zoneType==""){
				$scope.zoneTypeErr=true
				return;
			}else{
				$scope.zoneTypeErr=false	
			}
			
			
			if(zone.zoneName==undefined||zone.zoneName==""){
				$scope.zoneNameErr=true
				return;
			}else{
				$scope.zoneNameErr=false	
			}
			
			
			if(zone.zoneLocation==""||zone.zoneLocation==undefined){
				$scope.locationErr=true
				return;
			}else{
				$scope.locationErr=false	
			}
			if(zone.zoneId==""||zone.zoneId==undefined){
				$scope.zoneIdErr=true
				return;
			}else{
				$scope.zoneIdErr=false	
			}
			console.log("zone: "+JSON.stringify(zone))

			zone.addedBy=	userDetail;
			zone.addedDate=new Date();
			zone.active=1
			
			var msg=""
				 var url =zonedeviceUrl+"/addNewZone";
				genericFactory.add(msg,url,zone).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
					loadZones();
					$scope.addNew=false;
				}else{
					toastr.error(response.data.message);

				}
				
			});
			
		}
			
		
	}

	
})();
