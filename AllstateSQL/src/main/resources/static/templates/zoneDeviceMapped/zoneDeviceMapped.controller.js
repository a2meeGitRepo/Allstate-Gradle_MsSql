(function() {
	'use strict';

	angular.module('myApp.zoneDeviceMapped').controller('ZoneDeviceMappedController', ZoneDeviceMappedController);

	ZoneDeviceMappedController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function ZoneDeviceMappedController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var zonedeviceUrl = ApiEndpoint.url+"zonedevice";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			add:add,
			loadAssingedDevice:loadAssingedDevice,
			mappedDevive:mappedDevive,
			remove:remove,
			cancle:cancle
		});

		(function activate() {
			loadZoneDevice();
			
		})();
		function loadZoneDevice() {
		     var msg=""
			 var url =zonedeviceUrl+"/getAllZoneDevices";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.zonedevices = response.data;
			console.log("zonedevices: "+JSON.stringify(vm.zonedevices))
			
			
		});
	}
		function edit(device){
			$scope.addNew=true;
			$scope.device=device;
		}
		function add(){
			$scope.addNew=true;
			loadZones();
			
			
		}
		function mappedDevive(device){
			console.log("device: "+JSON.stringify(device))
			console.log("zoneMapping.zone: "+JSON.stringify($scope.zoneMapping.zone))
			if($scope.zoneMapping.zone==undefined){
				$scope.zoneErr=true
				return;
			}else{
				$scope.zoneErr=false
			}
			var zoneDevice={}
			zoneDevice.zone=$scope.zoneMapping.zone
			zoneDevice.device=device
			zoneDevice.assingedBy=userDetail
			zoneDevice.assingedDate= new Date();
			zoneDevice.active=1
			
			var msg=""
				 var url =zonedeviceUrl+"/addNewZoneDevice";
				genericFactory.add(msg,url,zoneDevice).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
					
					 loadAssingedDevice($scope.zoneMapping.zone)
					// loadAvailableDevice($scope.zoneMapping.zone)
					 loadZoneDevice();
				}else{
					toastr.error(response.data.message);

				}
				
				
			});
			
				
		}
		function remove(zoneDevice){
			
			var msg=""
				 var url =zonedeviceUrl+"/removeZoneDevice";
				genericFactory.add(msg,url,zoneDevice).then(function(response) {
				
				console.log("response: "+JSON.stringify(response))
				if(response.data.code==200){
					toastr.success(response.data.message);
					//loadAvailableDevice(zoneDevice.zone);
					 loadAssingedDevice(zoneDevice.zone)
					 loadZoneDevice();
				}else{
					toastr.error(response.data.message);

				}
				
				
			});
			
		}
		function loadZones(){
			 var msg=""
				 var url =zonedeviceUrl+"/getAllActiveZones";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.zones = response.data;
				console.log("zones: "+JSON.stringify(vm.zones))
				
				
			});
		}
		function loadAvailableDevice(zone){
			 var msg=""
				
			 var url=""
				 console.log("AVAILABALE ZONE : "+JSON.stringify(zone))
			 if(zone.zoneType=="BLE"){
				  url =zonedeviceUrl+"/getAllAvailableDevices?deviceType=2";

			 }
			 else{
				 url =zonedeviceUrl+"/getAllAvailableDevices?deviceType=1";
			 }
			 console.log("AVAILABALE : "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.availableDevie = response.data;
				console.log("availableDevie: "+JSON.stringify(vm.availableDevie))
				
				
			});
		}
		function loadAssingedDevice(zone){
			loadAvailableDevice(zone);
			 var msg=""
				 var url =zonedeviceUrl+"/getAllAssingedDevicesByZone?zoneId="+zone.id;
			 console.log("URL : "+url)
				genericFactory.getAll(msg,url).then(function(response) {
				vm.assingedDevies = response.data;
				console.log("assingedDevies: "+JSON.stringify(vm.assingedDevies))
				
				
			});
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
