(function() {
	'use strict';

	angular.module('myApp.device').controller('DeviceController', DeviceController);

	DeviceController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function DeviceController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var zonedeviceUrl = ApiEndpoint.url+"device";
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
			loadDevice();
			
		})();
		function loadDevice() {
		     var msg=""
			 var url =zonedeviceUrl+"/getAllDevice";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.devices = response.data;
			console.log("devices: "+JSON.stringify(vm.devices))
			
			
		});
	}
		function edit(device){
			$scope.addNew=true;
			vm.device=device;
		}
		function add(){
			$scope.addNew=true;
			$scope.device={}
			
		}

		function cancle(){
			
			$scope.addNew=false;
		
		}
		function changeStatus(device){
			var msg=""
				 var url =zonedeviceUrl+"/updateDeviceStatus";
				genericFactory.add(msg,url,device).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
				}else{
					toastr.error(response.data.message);

				}
				loadDevice();
				
			});
		}
		function delet(device){
			var msg=""
				 var url =zonedeviceUrl+"/deletDevice";
				genericFactory.add(msg,url,device).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
				}else{
					toastr.error(response.data.message);

				}
				loadDevice();
				
			});
		}
		function save(device){
				
			if(device==undefined||device.deviceType==""){
				$scope.deviceTypeErr=true
				return;
			}else{
				$scope.deviceTypeErr=false	
				
			}
			if(device.locationName==""||device.locationName==undefined){
				$scope.locationNameErr=true
				return;
			}else{
				$scope.locationNameErr=false	
			}
			if(device.deviceName==""||device.deviceName==undefined){
				$scope.deviceNameErr=true
				return;
			}else{
				$scope.deviceNameErr=false	
			}
			
			
			if(device.macId==""||device.macId==undefined){
				$scope.macErr=true
				return;
			}else{
				$scope.macErr=false	
			}
			
			if(device.deviceType=="1"||device.deviceType==1){
				if(device.antenaNo==""||device.antenaNo==undefined){
					$scope.antenaNoErr=true
					return;
				}else{
					$scope.antenaNoErr=false	
				}
				
			}
			console.log("device: "+JSON.stringify(device))

			device.addedBy=	userDetail;
			device.addedDate=new Date();
			device.active=1
			
			var msg=""
				 var url =zonedeviceUrl+"/addNewDevice";
				genericFactory.add(msg,url,device).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
					$scope.addNew=false;

				}else{
					toastr.error(response.data.message);

				}
				loadDevice();
			});
			
		}
			
		
	}

	
})();
