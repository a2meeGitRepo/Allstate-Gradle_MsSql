(function() {
	'use strict';

	angular.module('myApp.assetSummaryReport').controller('AssetSummaryReportController', AssetSummaryReportController);

	AssetSummaryReportController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$filter'];
	
	/* @ngInject */
	function AssetSummaryReportController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$filter) {
		var reportUrl  = ApiEndpoint.url+"report";
		var vm = angular.extend(this, {
			
		});

		(function activate() {
			
			loadReport();
		
		})();
			
		function loadReport(){
			var msg=""
			 var url =reportUrl+"/assetSummaryReport";
			genericFactory.getAll(msg,url).then(function(response) {
			vm.assetSummary = response.data;
			console.log("AssetSummary: "+JSON.stringify(vm.assetSummary))
					
		});
	}
	
	}
})();
