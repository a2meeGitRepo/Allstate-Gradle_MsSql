(function() {
	'use strict';

	angular
	.module('myApp.assetStock', [])
	.config(function($stateProvider) {
				$stateProvider
				.state('main.assetStock', {
					url : "/assetStock",
					views : {
						"sub" : {
							templateUrl : "templates/assetStock/assetStock.html",
							controller : "AssetStockController as vm"
						}
					}
				})
			});

})();