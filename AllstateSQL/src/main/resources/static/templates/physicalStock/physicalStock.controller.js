(function() {
	'use strict';

	angular.module('myApp.physicalStock').controller('PhysicalStockController', PhysicalStockController);

	PhysicalStockController.$inject = [ '$state', '$uibModal','genericFactory', '$log','$scope', 'toastr' , 'localStorageService', 'ApiEndpoint','$window','$rootScope','$filter'];
	
	/* @ngInject */
	function PhysicalStockController($state,$uibModal, genericFactory, $log, $scope, toastr, localStorageService, ApiEndpoint,$window,$rootScope,$filter) {
		var tansactionUrl  = ApiEndpoint.url+"tansaction";
		var vm = angular.extend(this, {
			getStockByDate:getStockByDate,
			clear:clear,
		});

		(function activate() {
			
			
		
		})();
			function getStockByDate(date){
				if(date==undefined||date==""){
					alert("Please select Date")
					return;
				}
				var physicalStock={}
				physicalStock.stockDate=date
						var msg=""
						 var url =tansactionUrl+"/getPhysicalStockByDate";
						genericFactory.add(msg,url,physicalStock).then(function(response) {
						vm.stocks = response.data;
						if(vm.stocks.length==0){
							alert("No stock report availabe on "+$filter('date')(date,'dd-MM-yyyy'));
						}
						console.log("notification: "+JSON.stringify(vm.stocks))
						
						
					});
			}
		
			function clear(){
				vm.stock=[]
			}

	
	}
})();
