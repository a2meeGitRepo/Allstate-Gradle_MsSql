(function() {
	'use strict';

	angular.module('myApp.employeeAlert').controller('EmployeeAlertController', EmployeeAlertController);

	EmployeeAlertController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$filter'];
	
	/* @ngInject */
	function EmployeeAlertController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$filter) {
		var tansactionUrl  = ApiEndpoint.url+"tansaction";
		var zonedeviceUrl = ApiEndpoint.url+"zonedevice";

		var vm = angular.extend(this, {
			selAlertBy:selAlertBy,
			getReport:getReport,
		});

		(function activate() {
			
			
		
		})();
		function selAlertBy(alertBy){
			if(alertBy=="Zone"){
				loadZones();
			}
		}
		function loadZones(){
			 var msg=""
				 var url =zonedeviceUrl+"/getAllActiveZones";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.zones = response.data;
				console.log("zones: "+JSON.stringify(vm.zones))
				
				
			});
		}
		
		function getReport(alert){
			console.log("alert: "+JSON.stringify(alert))
 var url ="";
			if(alert==undefined||alert.alertBy==""){
				$scope.alertByErr=true;
				return;
			}else{
				$scope.alertByErr=false;
				
			}
			
			
			if(alert.alertBy=="Zone"){
				if(alert.zone==undefined||alert.zone==""){
					$scope.zoneErr=true
					return;
				}else{
					$scope.zoneErr=false
					url=zonedeviceUrl+"/getEmpliyeeAlertByZone?zoneId="+alert.zone.zoneId
				}
				
				
			}
			if(alert.alertBy=="Date"){
				if(alert.alertDate1=undefined||alert.alertDate1==""){
					$scope.dateErr=true
					return;
				}else{
					$scope.dateErr=false
					url=zonedeviceUrl+"/getEmpliyeeAlertByZone?zoneId="+alert.zone.zoneId

				}
				
				
			}
			
			
			 var msg=""
				 var url =zonedeviceUrl+"/getAllActiveZones";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.zones = response.data;
				console.log("zones: "+JSON.stringify(vm.zones))
				
				
			});
		}
	
	}
})();
