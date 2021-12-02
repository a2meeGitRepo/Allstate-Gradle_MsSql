(function() {
	'use strict';

	angular
	.module('myApp.physicalStock', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.physicalStock', {
					url : "/physicalStock",
					views : {
						"sub" : {
							templateUrl : "templates/physicalStock/physicalStock.html",
							controller : "PhysicalStockController as vm"
						}
					}
				})
			});

})();