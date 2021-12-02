(function() {
	'use strict';

	angular.module('myApp.assetInfo').controller('AssetInfoController', AssetInfoController);

	AssetInfoController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$http','$stateParams'];
	
	/* @ngInject */
	function AssetInfoController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$http,$stateParams) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var commonUrl = ApiEndpoint.url+"common";
		var assetEmpMappedUrl = ApiEndpoint.url+"assetEmpMapped";
		var assetUrl = ApiEndpoint.url+"asset";
		var sId=$stateParams.id;
		console.log("State Param sId:"+sId)
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
		
		});

		(function activate() {
			loadBranch()
			getAsset();
			getAllocationDetials();
			getAllocationHistory()
			
		})();
		
		function getAsset(){
			var msg=""
				 var url =assetUrl+"/getAssetById?id="+sId;
				genericFactory.getAll(msg,url).then(function(response) {
					vm.asset = response.data;
				console.log("asset: "+JSON.stringify(vm.asset))
								
			});
		}
		function getAllocationDetials(){
			var msg=""
				 var url =assetEmpMappedUrl+"/getAllocationByAssetId?id="+sId;
				genericFactory.getAll(msg,url).then(function(response) {
					vm.allocation = response.data;
				console.log("allocation: "+JSON.stringify(vm.allocation))
				if(vm.allocation==""){
				$scope.noAllocation=true	
				}else{
					$scope.noAllocation=false
				}
								
			});
		}
		function getAllocationHistory(){
			var msg=""
				 var url =assetEmpMappedUrl+"/getAllocationHistoryByAssetId?id="+sId;
				genericFactory.getAll(msg,url).then(function(response) {
					vm.allocationHistory = response.data;
				console.log("allocationHistory: "+JSON.stringify(vm.allocationHistory))
				if(vm.allocationHistory==""){
				$scope.noAllocationHistory=true	
				}else{
					$scope.noAllocationHistory=false
				}
								
			});
		}
		
		function loadBranch(){
			var msg=""
				 var url =commonUrl+"/getAllBranches";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.branches = response.data;
				console.log("branches: "+JSON.stringify(vm.branches))
								
			});
		}
		
		
		
		
		
		
	}

	
})();
