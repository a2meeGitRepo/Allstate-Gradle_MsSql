(function() {
	'use strict';

	angular.module('myApp.assetStock').controller('AssetStockController', AssetStockController);

	AssetStockController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope'];
	
	/* @ngInject */
	function AssetStockController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope) {
		var assetRegistationUrl = ApiEndpoint.url+"assetRegistation";
		var userDetail = localStorageService.get(ApiEndpoint.userKey);
		var vm = angular.extend(this, {
			
		});

		(function activate() {
			$scope.alertType=false;
			loadAssetStocks()
		})();
		
		
		function loadAssetStocks(){
			var msg=""
				 var url =assetRegistationUrl+"/listAllAssetRegister";
				genericFactory.getAll(msg,url).then(function(response) {
				vm.assetStocks = response.data;
				console.log("assetStocks: "+JSON.stringify(vm.assetStocks))
						
			});
		}
		
	
	}

	
})();
